export type Constraint<TIn = unknown> = (value: TIn) => boolean

export type NamedConstraint<TKind extends string = string, TIn = unknown> = {
    kind: TKind
    fn: Constraint<TIn>
}

export type AnyConstraint<TName extends string = string, TIn = unknown> =
    Constraint<TIn>
// | NamedConstraint<TName, TIn>
