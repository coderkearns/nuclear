import { extendSubscription } from "./shared"

const PROTO_ATOM = extendSubscription({
    value: null,
    get() {
        return this.value
    },
    set(newValue) {
        const oldValue = this.value
        this.value =
            typeof newValue === "function" ? newValue(oldValue) : newValue
        this.publish(this.value, oldValue)
    },
})

export function atom(defaultValue) {
    const _atom = Object.create(PROTO_ATOM)
    _atom.value = defaultValue
    return _atom
}
