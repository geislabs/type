import { Castable, CustomType, TypeConstructor } from '../typeTypes'
import * as z from 'zod'

type CastFn<T extends z.ZodSchema<any>> = (
    type: CustomType<any, T>,
    value: z.infer<T>
) => z.infer<T>

interface TypedCastFn<T extends z.ZodSchema<any>> {
    (value: z.infer<T>): z.infer<T>
    (...transforms: [...Transform<z.infer<T>>[]]): TransformedCastFn<T>
}

interface TransformedCastFn<T extends z.ZodSchema<any>> {
    (...transforms: [...Transform<z.infer<T>>[]]): TransformedCastFn<T>
    (value: CustomType<any, T>): TypedCastFn<T>
}

type Transform<T> = (value: T) => T

// export function cast<TType extends CustomType>(
//     ...transforms: [...Transform<z.infer<TType['schema']>>[]]
// ): T extends CustomType<any, infer U> ? TypedCastFn<U> : never
export function cast<TVal extends Castable<any>, TType extends CustomType>(
    ...transforms: [...Transform<z.infer<TType['schema']>>[]]
): TransformedCastFn<TType['schema']> {
    // @ts-expect-error
    return (type: TType) =>
        (value: TVal): z.infer<TType['schema']> => {
            const name = `to${capitalize(type.kind)}`
            // @ts-expect-error
            const handler = value[name]
            const casted = handler(value)
            const transformed = transforms.reduce(
                (acc, transform) => transform(acc),
                casted
            )
            const result = type.schema.safeParse(transformed)
            return result.success ? result.data : result.error
        }
}

interface StringType extends CustomType<'string', z.ZodString> {}
interface IntegerType extends CustomType<'integer', z.ZodNumber> {}

const String: StringType = {
    kind: 'string',
    schema: z.string(),
}

const Integer: IntegerType = {
    kind: 'integer',
    schema: z.number(),
}

function uppercase(value: string) {
    return value.toUpperCase()
}

function double(value: number) {
    return value * 2
}

const custom1 = cast(uppercase, uppercase, uppercase)
const custom2 = cast(uppercase, uppercase, uppercase)(String)
const custom3 = cast(uppercase, uppercase, uppercase)(String)('hello')
const custom4 = cast(uppercase)(uppercase, uppercase)

// @ts-expect-error
const casted1 = custom1('hello')
const casted2 = custom2('hello')
const casted3 = custom3

function capitalize<T extends string>(value: T): `${Capitalize<T>}` {
    return (value.charAt(0).toUpperCase() +
        value.slice(1)) as `${Capitalize<T>}`
}
