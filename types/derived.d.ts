import { Subscription, ValueSubscription } from "./shared"

export type Derived<T> = ValueSubscription<T, []>

export function derived<T>(
    fn: () => T,
    dependencies: Subscription[]
): Derived<T>
