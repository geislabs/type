import { TypeConstructor } from '../constructor/constructorTypes'
import { GetCastFn, Cast } from './castTypes'
import { capitalize } from '../string/stringHelpers'

export function getCastFn<T extends TypeConstructor>(
    type: T,
    value: Cast<T>
): // @ts-expect-error
Cast<T>[GetCastFn<T>] | null {
    if (typeof value !== 'object') {
        return null
    }
    // @ts-expect-error
    const handlerName: keyof typeof value = `to${capitalize(type.typeName)}`
    // @ts-expect-error
    return value?.[handlerName] ?? null
}
