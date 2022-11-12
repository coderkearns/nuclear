import { extendSubscription } from "./shared.js"

const PROTO_DERIVED = extendSubscription({
    fn() {},
    value: null,
    get() {
        return this.value
    },
    _trigger() {
        this.value = this.fn()
        this.publish()
    },
    toString() {
        return `Derived(${this.value}, listeners=${this._listeners.length})`
    },
})

export function derived(fn, dependencies = []) {
    const _derived = Object.create(PROTO_DERIVED)
    _derived._listeners = []
    _derived.fn = fn
    _derived.value = fn()

    for (const dep of dependencies) {
        dep.subscribe(() => _derived._trigger())
    }

    return _derived
}
