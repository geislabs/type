import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const Boolean = Nominal('boolean', z.boolean())
