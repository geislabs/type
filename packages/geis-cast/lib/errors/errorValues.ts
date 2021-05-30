import { RemoveErrors, ValueMap } from '../typeTypes'

export interface ErrorResult {
    errors: Error[]
    values: RemoveErrors<ValueMap>
}
