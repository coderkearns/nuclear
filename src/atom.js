function atom(defaultValue) {
    let currentValue = defaultValue

    const _atom = () => currentValue

    let listeners = []
    _atom.subscribe = (fn) => {
        listeners.push(fn)
        return () => { listeners = listeners.filter(l => fn !== l) }
    }

    _atom.set = (newValue) => {
        if (typeof newValue === 'function') {
            newValue = newValue(currentValue)
        }

        oldValue = currentValue
        currentValue = newValue

        listeners.forEach(fn => fn(newValue, oldValue))
    }

    return _atom
}

module.exports = { atom }
