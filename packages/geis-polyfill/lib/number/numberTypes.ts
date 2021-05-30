export {}

declare global {
    interface Numberable<T extends any = any> {
        toNumber(): T
    }
    interface NumberConstructor {
        /**
         * Cast to number
         */
        <TVal extends Numberable>(selector: TVal): TVal extends Numberable<
            infer U
        >
            ? U
            : never
    }
}
