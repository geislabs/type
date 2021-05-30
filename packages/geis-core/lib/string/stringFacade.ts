import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const String = Nominal('string', z.string())
