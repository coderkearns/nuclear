
export type SubscriberFn<Subscriber> = (fn: Subscriber) => () => void

/** An Observable has a subscribe() method that takes a subscriber function. This function takes a different shape depending on the observable type. */
export interface Observable<Subscriber> { subscribe: SubscriberFn<Subscriber> }
