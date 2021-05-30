import { apply } from '../'

describe('apply', () => {
    test('simple', async () => {
        await expect(
            apply({
                value: 1,
            })
        ).resolves.toStrictEqual({
            value: 1,
        })
    })
})
