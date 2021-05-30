import isPromise from 'is-promise'
import { ValueMap } from '../typeTypes'
import { PromiseResult } from './promiseValues'

export function collectPromises(values: ValueMap): PromiseResult {
    return Object.entries(values).reduce<PromiseResult>(
        (acc, [key, value]) =>
            isPromise(value)
                ? {
                      ...acc,
                      promises: {
                          ...acc.promises,
                          [key]: value as Promise<any>,
                      },
                  }
                : { ...acc, values: { ...acc.values, [key]: value } },
        {
            values: {},
            promises: {},
        }
    )
}
