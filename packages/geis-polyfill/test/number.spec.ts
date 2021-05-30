import {} from '../lib'

const target: { toNumber: () => number | Error | null } = { toNumber: () => 1 }

describe('number', () => {
    test('simple', () => {
        const actual = Number(target)
        expect(actual).toBeDefined()
    })
})
