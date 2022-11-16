import { WritableValueSubscription } from "./shared"

export type Atom<T> = WritableValueSubscription<T, [newValue: T, oldValue: T]>

export function atom<T>(defaultValue: T): Atom<T>
