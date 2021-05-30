export interface Validator<TKind extends string = string> {
    kind: TKind
    validate: (value: any) => boolean
}
