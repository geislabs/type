import { toArray } from 'ix/asynciterable'
import {
    ValueMap,
    Castable,
    CustomType,
    TypeConstructor,
    ApplyValue,
} from './typeTypes'
import { capitalize } from './typeUtils'

/**
 * Attempt to cast value to target type
 * @param castable
 * @param target
 * @returns
 */
export function cast<
    T extends Castable<any>,
    TTarget extends TypeConstructor<any, any> | CustomType<any, any>,
    TKey extends `to${Capitalize<
        TTarget extends TypeConstructor<infer U>
            ? U['kind']
            : TTarget extends CustomType
            ? TTarget['kind']
            : never
    >}`,
    TReturn = T[TKey] extends (...args: any) => any
        ? ReturnType<T[TKey]>
        : never
>(castable: T, target: TTarget): TReturn {
    // @ts-expect-error
    const type: CustomType = typeof target === 'function' ? target() : target
    const name = `to${capitalize(type.kind)}`
    // @ts-expect-error
    const handler = castable[name]
    if (!handler) {
        throw new Error(
            `type cast '${name}' not found on object [${Object.keys(
                castable
            ).join(', ')}]`
        )
    }
    const casted = handler()
    return type.schema.parse(casted)
}
