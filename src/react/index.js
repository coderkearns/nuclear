import { useReducer, useEffect } from "react"

function useRerender() {
    return useReducer(v => !v, false)[1]
}

export function useSubscription(subscription) {
    const rerender = useRerender()

    useEffect(() => {
        if (!subscription) return

        const unsubscribe = subscription.subscribe(() => rerender())
        return unsubscribe
    }, [subscription])
}

export function useAtom(atom) {
    useSubscription(atom)
    return [atom.get(), atom.set.bind(atom)] // TODO: Is there a better way to do this than `atom.set.bind()`?
}

export function useReadableAtom(atom) {
    useSubscription(atom)
    return atom.get()
}
