const PROTO_SUBSCRIPTION = {
    _listeners: [],
    subscribe: function (fn) {
        this._listeners.push(fn)
        return () => {
            this._listeners = this._listeners.filter(l => l !== fn)
        }
    },
    publish(...args) {
        this._listeners.forEach(l => l(...args))
    },
}
const PROTO_ATOM = Object.assign(Object.create(PROTO_SUBSCRIPTION), {
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
