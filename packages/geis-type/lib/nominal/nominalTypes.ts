import * as z from 'zod'
import { NominalReference } from './nominalValues'

export interface NominalType<TName extends string, TOut = unknown, TIn = TOut>
    extends NominalReference<TName> {
    schema: z.ZodSchema<TOut, any, TIn>
}
