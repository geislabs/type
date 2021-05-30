import { z } from 'zod'

export interface CreateNominalAttrs<
    TName extends string,
    TOut = unknown,
    TIn = TOut
> {
    name: TName
    input: z.ZodSchema<TIn>
    output: z.ZodSchema<TOut>
    constructorFn: (value: TIn) => TOut
}
