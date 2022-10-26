import { Observable } from "./shared"

export function atom<T>(defaultValue: T): Observable<(newValue: T, oldValue: T) => void> & { (): T, set: (newValue: (T | ((oldValue: T) => T))) => void }
