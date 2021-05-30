import { z } from 'zod'
import { Cast, GetCastFn } from '../casts/castTypes'

type GetReturnType<TName extends string, TCast extends Cast<any>> =
    TCast[GetCastFn<TypeConstructor<TName>>] extends (...args: any) => any
        ? ReturnType<TCast[GetCastFn<TypeConstructor<TName>>]>
        : never

export interface TypeConstructor<
    TName extends string = string,
    TOut = any,
    TIn = TOut
> {
    typeName: TName
    schema: z.ZodSchema<TOut, any, TIn>
    <TVal extends TIn | Cast<TypeConstructor<TName, TOut, TIn>>>(
        value: TVal
    ): TVal extends Cast<any> ? GetReturnType<TName, TVal> : TVal
}

export interface TypeConstructorDefault<
    TName extends string = string,
    TOut = any,
    TIn = TOut
> {
    typeName: TName
    schema: z.ZodSchema<TOut, any, TIn>
    defaultExpr: TOut
    (value?: TIn | null): TOut
}
