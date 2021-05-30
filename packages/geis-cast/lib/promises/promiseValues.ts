import { RemovePromises, ValueMap } from '../typeTypes'

export interface PromiseMap {
    [key: string]: Promise<any>
}

export interface PromiseResult {
    promises: PromiseMap
    values: RemovePromises<ValueMap>
}
