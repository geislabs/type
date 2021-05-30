import { apply, ApplyError } from '../lib'

describe('promose', () => {
    test('simple', async () => {
        await expect(
            apply({
                two: 2,
                five: Promise.resolve(5),
            })
        ).resolves.toStrictEqual({
            two: 2,
            five: 5,
        })
    })
    test('reject', async () => {
        await expect(
            apply({
                two: 2,
                five: Promise.reject(new Error('failed')),
            })
        ).rejects.toThrow(new ApplyError([new Error('failed')]))
    })
})
