import { apply, ApplyError } from '../lib'

describe('error', () => {
    test('simple', async () => {
        await expect(
            apply({
                value: 1,
                failed: new Error('failed'),
            })
        ).rejects.toThrow(new ApplyError([new Error('failed')]))
    })
})
