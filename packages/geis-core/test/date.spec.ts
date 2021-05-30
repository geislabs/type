import { Date } from '../lib'

describe('date', () => {
    test('simple', () => {
        const actual = Date('2020-10-10T10:00:00Z')
        expect(actual).toBeInstanceOf(global.Date)
    })
})
