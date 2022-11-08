const subscription = {
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

export function atom(defaultValue) {
	const _atom = Object.create(subscription)

	_atom.value = defaultValue

	_atom.get = function () {
		return this._value
	}

	_atom.set = function (newValue) {
		const oldValue = this._value
		this._value =
			typeof newValue === "function" ? newValue(oldValue) : newValue
		_atom.publish(this._value, oldValue)
	}

	return _atom
}
