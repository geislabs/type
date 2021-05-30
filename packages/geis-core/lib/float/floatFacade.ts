import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const Float = Nominal('float', z.number())
