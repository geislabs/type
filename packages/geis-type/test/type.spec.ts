import { z } from 'zod'
import { Nominal, Type } from '../lib'

const String = Nominal('string', z.string())

describe('nominal', () => {
    test('simple', () => {
        const Name = Type(String)
        const actual = Name('jack')
        expect(actual).toBe('jack')
    })
    test('default expr optional', () => {
        const Name = Type(String, 'jack')
        const actual = Name()
        expect(actual).toBe('jack')
    })
    test('default expr null', () => {
        const Name = Type(String, 'jack')
        const maybeString: string | null = null
        const actual = Name(maybeString)
        expect(actual).toBe('jack')
    })
})
