export class ApplyError extends Error {
    constructor(public errors: Error[]) {
        super()
        Object.setPrototypeOf(this, ApplyError.prototype)
    }
}
