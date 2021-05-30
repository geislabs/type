import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const Integer = Nominal('integer', z.number())
