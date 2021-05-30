export {}

declare global {
    interface Stringable<T extends any = any> {
        toString(): T
    }
    interface StringConstructor {
        /**
         * Cast to string
         */
        <TVal extends Stringable>(selector: TVal): TVal extends Stringable<
            infer U
        >
            ? U
            : never
    }
}
