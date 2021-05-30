import { z } from 'zod'
import { Cast, GetCastFn } from '../casts/castTypes'
import { Constraint } from '../constraints/constraintTypes'

type GetReturnType<TName extends string, TCast extends Cast<any>> =
    TCast[GetCastFn<TypeConstructor<TName>>] extends (...args: any) => any
        ? ReturnType<TCast[GetCastFn<TypeConstructor<TName>>]>
        : never

export interface TypeConstructor<
    TName extends string = string,
    TOut = any,
    TIn = TOut,
    TConstraint extends Constraint | unknown = unknown
> {
    typeName: TName
    schema: z.ZodSchema<TOut, any, TIn>
    <TVal extends TIn | Cast<TypeConstructor<TName, TOut, TIn>>>(
        value: TVal
    ): TVal extends Cast<TypeConstructor<TName, TOut, TIn>>
        ? TConstraint extends (value: any) => any
            ? GetReturnType<TName, TVal> | Error
            : GetReturnType<TName, TVal>
        : TConstraint extends (value: any) => any
        ? TVal | Error
        : TVal
}

export interface TypeConstructorDefault<
    TName extends string = string,
    TOut = any,
    TIn = TOut,
    TConstraint = any
> {
    typeName: TName
    schema: z.ZodSchema<TOut, any, TIn>
    defaultExpr: TOut
    <TVal extends TIn | Cast<TypeConstructor<TName, TOut, TIn>>>(
        value?: TVal
    ): TVal extends Cast<TypeConstructor<TName, TOut, TIn>>
        ? TConstraint extends (value: any) => any
            ? GetReturnType<TName, TVal> | Error
            : GetReturnType<TName, TVal>
        : TConstraint extends (value: any) => any
        ? TVal | Error
        : TVal
}
