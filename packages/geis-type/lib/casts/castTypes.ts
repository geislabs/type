import { TypeConstructor } from '../constructor/constructorTypes'

export type GetCastFn<T extends TypeConstructor> = `to${Capitalize<
    T['typeName']
>}`

export type Cast<T extends TypeConstructor> = {
    [P in GetCastFn<T> & keyof T]: () => T extends TypeConstructor<
        string,
        infer TOut
    >
        ? TOut extends T[P]
            ? TOut
            : never
        : never
}
