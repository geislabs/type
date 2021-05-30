import { TypeConstructor, ArrayType, CustomType } from '@geislabs/geis-type'
import * as z from 'zod'
import { BooleanType, IntegerType, StringType } from './coreTypes'
import { max, min } from './validators'

export const String: TypeConstructor<StringType> & {
    min: typeof min
    max: typeof max
} = Object.assign<
    TypeConstructor<StringType>,
    { min: typeof min; max: typeof max }
>(
    (...validators) => ({
        kind: 'string',
        schema: validators.reduce(
            (acc, validator) => validator(acc),
            z.string()
        ),
    }),
    { min, max }
)

export const Integer: TypeConstructor<IntegerType> = (...validators) => ({
    kind: 'integer',
    schema: validators.reduce((acc, validator) => validator(acc), z.number()),
})

export const Boolean: TypeConstructor<BooleanType> = (...validators) => ({
    kind: 'boolean',
    schema: validators.reduce((acc, validator) => validator(acc), z.boolean()),
})

export const Array =
    (element: CustomType): TypeConstructor<ArrayType> =>
    (...validators) => ({
        kind: 'array',
        schema: validators.reduce(
            (acc, validator) => validator(acc),
            z.array(element.schema)
        ),
    })
