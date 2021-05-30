import { ValueMap } from '../typeTypes'
import { ErrorResult } from './errorValues'

export function collectErrors(values: ValueMap): ErrorResult {
    return Object.entries(values).reduce<ErrorResult>(
        (acc, [key, value]) =>
            value instanceof Error
                ? {
                      ...acc,
                      errors: [...acc.errors, value],
                  }
                : {
                      ...acc,
                      values: {
                          ...acc.values,
                          [key]: value,
                      },
                  },
        { values: {}, errors: [] }
    )
}
