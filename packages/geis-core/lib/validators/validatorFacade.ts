import * as z from 'zod'

export function min(constraint: number) {
    return (schema: z.ZodString) => schema.min(constraint)
}

export function max(constraint: number) {
    return (schema: z.ZodString) => schema.max(constraint)
}

export function lowercase(value: string) {
    return value.toLowerCase()
}

export function uppercase(value: string) {
    return value.toUpperCase()
}
