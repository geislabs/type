import * as z from 'zod'
import { getCastFn } from './casts/castHelpers'
import { AnyConstraint, Constraint } from './constraints/constraintTypes'
import {
    TypeConstructor,
    TypeConstructorDefault,
} from './constructor/constructorTypes'
import { Cast } from './casts/castTypes'
import { buildNominal } from './nominal/nominalFactory'
import { fromConstraints } from './schemas/schemaFactory'

/**
 * Returns a new nominal type constructor
 * @returns
 */
export function Nominal<TName extends string, TOut, TIn = TOut>(
    name: TName,
    rawschema: z.ZodSchema<TOut, any, TIn>
): TypeConstructor<TName, TOut, TIn> {
    const nominalType = buildNominal({ name, schema: rawschema })
    function handler(value: TIn | Cast<TypeConstructor<TName, TOut, TIn>>) {
        // @ts-expect-error
        const handler = getCastFn(nominalType, value)
        const casted = handler ? handler.call(value) : value
        const result = nominalType.schema.safeParse(casted)
        if (result.success) {
            return result.data
        }
        return result.error
    }
    // @ts-expect-error
    return Object.assign(handler, {
        typeName: nominalType.typeName,
        schema: nominalType.schema,
    })
}

/**
 * Create a new type constructor with an optional list of constraints
 * @param nominal
 * @param constraints
 * @returns
 */
export function Type<TName extends string, TOut, TIn = TOut>(
    nominal: TypeConstructor<TName, TOut, TIn>,
    ...constraints: AnyConstraint<string, TOut>[]
): TypeConstructor<TName, TOut, TIn>
export function Type<TName extends string, TOut, TIn = TOut>(
    nominal: TypeConstructor<TName, TOut, TIn>,
    defaultExpr: TIn,
    ...constraints: AnyConstraint<string, TOut>[]
): TypeConstructorDefault<TName, TOut, TIn>
export function Type<TName extends string, TOut, TIn = TOut>(
    nominal: TypeConstructor<TName, TOut, TIn>,
    defaultExpr?: TIn | AnyConstraint<string, TOut>,
    ...constraints: AnyConstraint<string, TOut>[]
) {
    function isConstraint(
        defaultExpr?: TIn | AnyConstraint<string, TOut>
    ): defaultExpr is AnyConstraint<string, TOut> {
        return typeof defaultExpr === 'function'
    }
    const resolvedConstraints = isConstraint(defaultExpr)
        ? [defaultExpr, ...constraints]
        : constraints
    const schema = fromConstraints(nominal.schema, resolvedConstraints)
    const type = Nominal(nominal.typeName, schema)
    if (defaultExpr && !isConstraint(defaultExpr)) {
        const wrapped = (value: TIn | null) => {
            return type(value ?? defaultExpr)
        }
        return Object.assign(wrapped, {
            typeName: type.typeName,
            schema: type.schema,
        })
    }
    return type
}
