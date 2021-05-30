import '../lib'

const target: { toString: () => string | Error | null } = { toString: () => '' }

describe('string', () => {
    test('simple', () => {
        const actual = String(target)
        expect(actual).toBeDefined()
    })
})
