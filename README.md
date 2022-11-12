<div align="center">
    <h1>Nuclear</h1>
    <p>Simple, framework-antagonist, and scientific reactive functionality with <strong>zero</strong> magic.</p>
</div>

## Description

Nuclear is a system for creating reactive values in an understandable way. Science-only: it hides nothing behind "magic".

## Getting Started

### Installing

* Use npm or yarn to install the newest version from this repository:

```shell
npm install git+https://github.com/coderkearns/nuclear
```

```shell
yarn add https://github.com/coderkearns/nuclear
```

## Usage

Use any function by importing it directly from the package:

```javascript
import { atom } from "nuclear"

const count = atom(0)
```

Should you choose to use it, TypeScript will "just work". You can also import the typescript types if you want to use them directly.

```typescript
import { atom, type Subscription } from "nuclear"

function useSubscription(subscription: Subscription) {
    // ...
}

const count = atom(0)
useSubscription(count) // All checks out!
```

### Subscriptions

All the reactivity of nuclear comes from the subscription pattern. A couple internet searches can explain this fully, but here are the basics:

```javascript
// A subscription is a change that can be "subscribed" to with certain functions.
// In this library, subscriptions store an array with all the listener functions that are subscribed to themselves.

const subscription = {
    listeners: [],
    // Subscribe a function to the subscription using .subscribe():
    subscribe(fn) {
        this.listeners.push(fn)
    },
    // .publish() will then call each listener function with the given arguments
    publish(...args) {
        this.listeners.forEach(listener => {
            listener(...args)
        })
    }
}

// Here's some example usage, assuming the "subscription" is a message that is sent at random.
const messageSubscription = getSubscriptionSomehow()

messageSubscription.subscribe(message => {
    alert(`Message was published: ${message}`)
})

// Now, whenever the subscription calls .publish(message), the function automatically runs!
messageSubscription.publish("Here's a new message") // Alerts "Message was published: Here's a new message"
```

Nuclear's "subscription" implementation looks like this TypeScript definition:

```typescript
// "Args" are the arguments that will be passed to listener functions.
// The previous example would be shown as: Subscription<[message: string]>
interface Subscription<Args extends any[] = any[]> {
     // .subscribe() takes a function that uses the Args, and returns an unsubscribe() function to cancel that specific listener.
    subscribe: (fn: (...args: Args) => void) => () => void
    // .publish() takes the args and calls all the listeners
    publish: (...args: Args) => void
}
```

### Atoms

An `atom` is the smallest *value* in nuclear. You can think of it as a variable whose changes can be subscribed to.

```javascript
import { atom } from "nuclear"

const count = atom(0) // The value you give it is the starting value

// Subscribe to the atom's changes just like any other subscription.
// It will pass the parameters `newValue` and `oldValue`
count.subscribe((newCount, oldCount) => {
    alert(`Count just changed from ${oldCount} to ${newCount}!`)
})

// Get the *current* value of an atom using .get()
console.log(`count = ${count.get()}`)

// Set the atom's value (and trigger all its subscriptions) using .set()
count.set(1) // Alerts "Count just changed from 0 to 1!"

// Instead of passing a value, you can .set() a function that returns a new value:
count.set(oldCount => oldCount + 1) // Alerts "Count just changed from 1 to 2!"
// This is the equivalent of:
count.set(count.get() + 1) // Alerts "Count just changed from 2 to 3!"
```

Atoms have the following TypeScript definition:

```typescript
// Atom listener functions will be passed (newValue, oldValue) as parameters
export interface Atom<T> extends Subscription<[newValue: T, oldValue: T]> {
    get: () => T
    // type ValueOrFn<T> = T | ((T) => T)
    // .set() can be called with either the new value, or a function to create a new value from the old one.
    set: (newValue: ValueOrFn<T>) => void
}
```

The `atom()` function creates atoms with the following definition:

```typescript
function atom<T>(defaultValue: T): Atom<T>
```

## Derived

A `derived` is like an `atom`, but instead of manually setting the value, it is computed based on other subscriptions.

```javascript
import { derived, atom } from "nuclear"

const firstName = atom("John")
const lastName = atom("Doe")

const fullName = derived(
    // The first argument is a function to compute the new value:
    () => `${firstName.get()} ${lastName.get()}`,
    // The second argument is an array of all the subscriptions to watch for:
    [firstName, lastName]
)

```

Here's the `Derived` TypeScript interface:

```typescript
export interface Derived<T> extends Subscription<[]> {
    get: () => T
}
```

and the `derived()` TypeScript definition:

```typescript
function derived<T>(fn: () => T, dependencies: Subscription[]): Derived<T>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
