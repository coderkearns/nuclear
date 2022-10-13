import { atom } from "./atom"

const count = atom(0)

count.subscribe((newValue, oldValue) => {
    console.log(`count=${newValue}, oldValue=${oldValue}`)
})

count.set(1)
count.set(c => c + 1)

console.log(count())
