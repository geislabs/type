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
export function Nominal<
    TName extends string,
    TConstruct = any,
    TOut extends TConstruct = any,
    TIn = TOut
>(
    name: TName,
    input: z.ZodSchema<TIn>,
    output: z.ZodSchema<TOut>,
    constructorFn: (value: TIn) => TConstruct
): TypeConstructor<TName, TConstruct, TOut, TIn> {
    const nominalType = buildNominal({ name, input, output, constructorFn })
    function handler(value: TIn): TOut | Error {
        // @ts-expect-error
        const handler = getCastFn(nominalType, value)
        // @ts-expect-error
        const casted = handler ? handler.call(value) : constructorFn(value)
        const result = nominalType.output.safeParse(casted)
        if (result.success) {
            return result.data as TOut
        }
        return result.error
    }
    // @ts-expect-error
    return Object.assign(handler, {
        typeName: nominalType.typeName,
        input: nominalType.input,
        output: nominalType.output,
        constructorFn: nominalType.constructorFn,
    })
}

/**
 * Create a new type constructor with an optional list of constraints
 * @param nominal
 * @param constraints
 * @returns
 */
// export function Type<
//     TName extends string,
//     TOut,
//     TIn = TOut,
//     TConstraint extends Constraint<TIn> | unknown = unknown
// >(
//     nominal: TypeConstructor<TName, TOut, TIn>,
//     defaultExpr: TIn,
//     ...constraints: TConstraint[]
// ): TypeConstructorDefault<TName, TOut, TIn, TConstraint>
export function Type<
    TName extends string,
    TConstruct = any,
    TOut extends TConstruct = TConstruct,
    TIn = TOut,
    TConstraint extends Constraint<TIn> | unknown = unknown
>(
    nominal: TypeConstructor<TName, TConstruct, TOut, TIn>,
    ...constraints: TConstraint[]
): TypeConstructor<TName, TConstruct, TOut, TIn, TConstraint>
export function Type<
    TName extends string,
    TConstruct = any,
    TOut extends TConstruct = TConstruct,
    TIn = TOut,
    TConstraint extends Constraint<TIn> | unknown = unknown
>(
    nominal: TypeConstructor<TName, TConstruct, TOut, TIn>,
    defaultExpr?: TIn | TConstraint,
    ...constraints: TConstraint[]
) {
    function isConstraint(
        defaultExpr?: TIn | TConstraint
    ): defaultExpr is TConstraint {
        return typeof defaultExpr === 'function'
    }
    const resolvedConstraints = isConstraint(defaultExpr)
        ? [defaultExpr, ...constraints]
        : constraints
    const constrainedOutput = fromConstraints(
        nominal.output,
        // @ts-expect-error
        resolvedConstraints
    )
    const type = Nominal(
        nominal.typeName,
        nominal.input,
        constrainedOutput,
        nominal.constructorFn
    )
    if (defaultExpr && !isConstraint(defaultExpr)) {
        const wrapped = (value: TIn | null) => {
            return type(value ?? defaultExpr)
        }
        return Object.assign(wrapped, {
            typeName: type.typeName,
            input: type.input,
            output: constrainedOutput,
            constructorFn: nominal.constructorFn,
        })
    }
    return type
}
