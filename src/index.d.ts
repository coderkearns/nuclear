export type Subscriber<T> = (value: T, oldValue: T) => void
export type SubscriberFn<T> = (fn: Subscriber<T>) => () => void
export type Observable<T> = { subscribe: SubscriberFn<T> }

export function atom<T>(defaultValue: T): Observable<T> & (() => T) & { set: (newValue: (T | ((oldValue: T) => T))) => void }
