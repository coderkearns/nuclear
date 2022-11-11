import { Subscription } from "./shared"

type ValueOrFn<T> = T | ((T) => T)
export interface Atom<T> extends Subscription<[newValue: T, oldValue: T]> {
    get: () => T
    set: (newValue: ValueOrFn<T>) => void
}

export function atom<T>(defaultValue: T): Atom<T>
