import {
    Subscription,
    ValueSubscription,
    WritableValueSubscription,
    ValueOrFn,
} from "../shared"

/**
 * Rerender the current component whenever `subscription` publishes
 * @example useSubscription(countAtom)
 * return <div>{countAtom.get()}</div>
 */
export function useSubscription(subscription: Subscription)

/**
 * Returns the current value of a readable atom but does not provide a setter function.
 * @example const count = useReadableAtom(countAtom)
 * return <div>{count}</div>
 */
export function useReadableAtom<T>(atom: ValueSubscription<T>): T

/**
 * Use an `atom` like a useState call. Returns [currentValue, setValue]
 * @example const [count, setCount] = useAtom(countAtom)
 * return <button onClick={() => setCount(count + 1)}>Count is {count}</button>
 */
export function useAtom<T>(
    atom: WritableValueSubscription<T>
): [T, (newValue: ValueOrFn<T>) => void]
