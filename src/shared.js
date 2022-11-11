const PROTO_SUBSCRIPTION = {
    _listeners: [],
    subscribe(fn) {
        this._listeners.push(fn)
        return () => {
            this._listeners = this._listeners.filter(l => l !== fn)
        }
    },
    publish(...args) {
        this._listeners.forEach(l => l(...args))
    },
}

export function extendSubscription(newProto) {
    return Object.assign(Object.create(PROTO_SUBSCRIPTION), newProto)
}
