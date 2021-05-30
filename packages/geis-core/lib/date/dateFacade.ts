import { Nominal } from '@geislabs/geis-type'
import { z } from 'zod'

export const Date = Nominal(
    'date',
    z.union([z.string(), z.number()]),
    z.date(),
    function (value) {
        try {
            if (typeof value === 'string') {
                return new global.Date(value)
            }
            if (typeof value === 'number') {
                return new global.Date(value)
            }
        } catch (error) {
            return error as Error
        }
    }
)
