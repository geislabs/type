import { collectErrors } from '../errors/errorHelpers'
import { collectPromises } from '../promises/promiseHelpers'
import { ApplyValue, ValueMap } from '../typeTypes'
import { ApplyError } from './applyErrors'

/**
 * Apply types
 * @param values
 * @returns
 */
export async function apply<T extends ValueMap>(
    values?: T | Promise<T>
): Promise<
    {
        [P in keyof T]: ApplyValue<T[P]>
    }
> {
    const resolved = await values
    if (resolved === undefined) {
        // @ts-expect-error
        return
    }
    if (typeof resolved !== 'object') {
        return resolved
    }
    const { values: withoutPromises, promises } = collectPromises(resolved)
    const resolvedValues = await Object.entries(promises).reduce(
        async (promiseAcc, [key, promiseValue]) => {
            const acc = await promiseAcc
            return {
                ...acc,
                [key]: await promiseValue.catch((error) => error),
            }
        },
        Promise.resolve(withoutPromises)
    )
    const { values: withoutErrors, errors } = collectErrors(resolvedValues)
    if (errors.length > 0) {
        throw new ApplyError(errors)
    }
    return withoutErrors as any
}
