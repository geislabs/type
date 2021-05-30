import { z } from 'zod'
import { Cast, GetCastFn, Target, TargetCast } from '../casts/castTypes'
import { Constraint } from '../constraints/constraintTypes'

// type GetReturnType<TName extends string, TCast extends Cast<any>> =
//     TCast[GetCastFn<TypeConstructor<TName>>] extends (...args: any) => any
//         ? ReturnType<TCast[GetCastFn<TypeConstructor<TName>>]>
//         : never

// type Test = string  extends string | Error ? 'yes' : 'no'
// const a: Test = 'no'

export interface TypeConstructor<
    TName extends string = string,
    TConstruct = any,
    TOut extends TConstruct = any,
    TIn = TOut,
    TConstraint extends Constraint | unknown = unknown
> {
    typeName: TName
    input: z.ZodSchema<TIn>
    output: z.ZodSchema<TOut>
    constructorFn: (raw: TIn) => TOut
    <TVal extends TIn | Target<TName, TOut, TIn, TVal>>(
        value: TVal
    ): TVal extends TIn ? TConstruct : TargetCast<TName, TIn, TVal>
}

export interface TypeConstructorDefault<
    TName extends string = string,
    TOut extends z.ZodSchema<any> = z.ZodSchema<any>,
    TIn extends z.ZodSchema<any> = TOut,
    TConstraint = any
> {
    typeName: TName
    schema: z.ZodSchema<TOut, any, TIn>
    constructorFn: (raw: TIn) => TOut
    // @ts-expect-error
    <TVal extends z.infer<TIn> | Target<TName, TIn>>(value?: TVal): TVal
}
