export interface Subscription<Args extends any[] = any[]> {
	subscribe: (fn: (...args: Args) => void) => () => void
	publish: (...args: Args) => void
}

type ValueOrFn<T> = T | ((T) => T)
type Atom<T> = Subscription<[newValue: T, oldValue: T]> & {
    get: () => T
    set: (newValue: ValueOrFn<T>) => void
}

export function atom<T>(defaultValue: T): Atom<T>
