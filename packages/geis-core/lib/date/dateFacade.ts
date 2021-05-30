import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const Date = Nominal('date', z.date())
