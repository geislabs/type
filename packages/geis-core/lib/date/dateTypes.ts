import { TypeConstructor } from '@geislabs/geis-type'

export interface DateConstructor
    extends TypeConstructor<'date', Date | Error, Date, string | number> {}
