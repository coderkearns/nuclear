import { Subscription } from "./shared"

export interface Derived<T> extends Subscription<[]> {
    get: () => T
    fn: () => T
}

export function derived<T>(
    fn: () => T,
    dependencies: Subscription[]
): Derived<T>
