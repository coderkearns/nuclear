export interface Subscription<Args extends any[] = any[]> {
    subscribe: (fn: (...args: Args) => void) => () => void
    publish: (...args: Args) => void
}

export interface ValueSubscription<T, Args = any[]> extends Subscription<Args> {
    get: () => T
}

export type ValueOrFn<T> = T | ((T) => T)

export interface WritableValueSubscription<T, Args = any[]>
    extends ValueSubscription<T, Args> {
    set: (newValue: ValueOrFn<T>) => void
}
