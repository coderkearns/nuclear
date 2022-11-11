export interface Subscription<Args extends any[] = any[]> {
    subscribe: (fn: (...args: Args) => void) => () => void
    publish: (...args: Args) => void
}
