import { z } from 'zod'
import { TypeConstructor } from '../constructor/constructorTypes'

export type GetCastFn<TName extends string> = `to${Capitalize<TName>}`

export type Cast<T extends TypeConstructor<any, any, any, any>> = {
    [P in GetCastFn<T['typeName']>]: () => T extends TypeConstructor<
        any,
        any,
        infer TIn
    >
        ? TIn | Error
        : never
}

// export type Target<TIn, TVal> = TVal extends TIn ? TVal : never

export type Target<TName extends string, TOut, TIn, TVal> = {
    [P in GetCastFn<TName>]: () => TVal extends Cast<any>
        ? TargetCast<TName, TIn, TVal>
        : TOut
}

export type TargetCast<TName extends string, TIn, TVal extends Cast<any>> =
    ReturnType<
        // @ts-expect-error
        TVal[GetCastFn<TName>]
    >
