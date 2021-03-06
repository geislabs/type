import { CreateNominalAttrs } from './nominalAttrs'
import { NominalType } from './nominalTypes'

export function buildNominal<TName extends string, TOut, TIn = TOut>(
    attrs: CreateNominalAttrs<TName, TOut, TIn>
): NominalType<TName, TOut, TIn> {
    return {
        typeName: attrs.name,
        input: attrs.input,
        output: attrs.output,
        constructorFn: attrs.constructorFn,
    }
}
