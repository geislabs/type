import { z } from 'zod'
import { Cast, Nominal, Type } from '../lib'

const Integer = Nominal('integer', z.number(), z.number(), (value) => value)
const String = Nominal('string', z.string(), z.string(), (value) => value)

class Float implements Cast<typeof Integer> {
    constructor(private value: number) {}
    toInteger() {
        return Math.floor(this.value)
    }
}

class Person implements Cast<typeof String> {
    constructor(private name?: string) {}
    toString() {
        return this.name ? this.name : new Error('no name')
    }
}

describe('casting', () => {
    test('simple', () => {
        const Price = Type(Integer)
        const price = new Float(10.5)
        const actual = Price(price)
        expect(actual).toBe(10)
    })
    test('error', () => {
        const Name = Type(String)
        const jack = new Person('jack')
        const anonymous = new Person()
        expect(Name(jack)).toBe('jack')
        expect(Name(anonymous)).toBeInstanceOf(Error)
    })
})
