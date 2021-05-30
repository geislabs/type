import { z } from 'zod'

export interface CreateNominalAttrs<
    TName extends string,
    TOut = unknown,
    TIn = TOut
> {
    name: TName
    schema: z.ZodSchema<TOut, any, TIn>
}
