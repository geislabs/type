import * as z from 'zod'
import { NominalReference } from './nominalValues'

export interface NominalType<TName extends string, TOut = unknown, TIn = TOut>
    extends NominalReference<TName> {
    output: z.ZodSchema<TOut>
    input: z.ZodSchema<TIn>
    constructorFn: (value: TIn) => TOut
}
