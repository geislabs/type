import { z } from 'zod'
import { Nominal } from '../lib'

describe('nominal', () => {
    test('simple', () => {
        const String = Nominal(
            'string',
            z.string(),
            z.string(),
            (value) => value
        )
        const actual = String('hello')
        expect(actual).toBe('hello')
    })
    test('simple', () => {
        const String = Nominal(
            'string',
            z.string(),
            z.string(),
            (value) => value as string | Error
        )
        const actual = String('hello')
        expect(actual).toBe('hello')
    })
})
