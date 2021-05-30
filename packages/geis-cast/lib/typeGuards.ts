import { CustomType, Typeable, TypeConstructor } from './typeTypes'

export function isConstructor(type: Typeable): type is TypeConstructor {
    return typeof type === 'function'
}

export function isType(type: Typeable): type is CustomType {
    return !isConstructor(type)
}
