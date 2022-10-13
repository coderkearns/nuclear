export type Subscriber<T> = (newValue: T, oldValue: T) => void
export type SubscriberFn<T> = (fn: Subscriber<T>) => () => void
export interface Observable<T> { subscribe: SubscriberFn<T> }
