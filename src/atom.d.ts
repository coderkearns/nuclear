import { Observable } from "./shared"

export function atom<T>(defaultValue: T): (() => T) & Observable<T> & { set: (newValue: (T | ((oldValue: T) => T))) => void }
