import { z } from 'zod'
import { Nominal, Type } from '../lib'

const String = Nominal('string', z.string())
const isAlpha = (value: string) => /^[A-Za-z]+$/.test(value)
const isLowercase = (value: string) => /^[a-z]+$/.test(value)

describe('constraints', () => {
    test('with default value', () => {
        const Name = Type(String, 'jack', isAlpha)
        const actual = Name()
        expect(actual).toBe('jack')
    })
    test('with incompatible default value', () => {
        const Name = Type(String, 'jack123', isAlpha)
        const actual = Name()
        expect(actual).toBeInstanceOf(Error)
    })
    test('all pass', () => {
        const Name = Type(String, isAlpha)
        const actual = Name('jack')
        expect(actual).toBe('jack')
    })
    test('all failed', () => {
        const Name = Type(String, isAlpha)
        const actual = Name('jack123')
        expect(actual).toBeInstanceOf(Error)
    })
    test('one failed', () => {
        const Name = Type(String, isAlpha, isLowercase)
        const actual = Name('Jack')
        expect(actual).toBeInstanceOf(Error)
    })
})
