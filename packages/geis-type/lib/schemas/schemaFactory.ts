import { z } from 'zod'
import { AnyConstraint } from '../constraints/constraintTypes'

export function fromConstraints<TOut, TIn>(
    schema: z.ZodSchema<TOut, any, TIn>,
    constraints: AnyConstraint<any, TOut>[]
) {
    return constraints.reduce(
        (acc, constraint) =>
            acc.refine((value) =>
                typeof constraint === 'function'
                    ? constraint(value)
                    : // @ts-expect-error
                      constraint.fn(value)
            ),
        schema
    )
}
