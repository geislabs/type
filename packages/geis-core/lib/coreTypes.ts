import { CustomType } from '@geislabs/geis-type'
import * as z from 'zod'

export interface StringType extends CustomType<'string', z.ZodString> {}
export interface IntegerType extends CustomType<'integer', z.ZodNumber> {}
export interface BooleanType extends CustomType<'boolean', z.ZodBoolean> {}
