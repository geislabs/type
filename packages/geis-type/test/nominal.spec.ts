import { z } from 'zod'
import { Nominal } from '../lib'

describe('nominal', () => {
    test('simple', () => {
        const String = Nominal('string', z.string())
        const actual = String('hello')
        expect(actual).toBe('hello')
    })
})
