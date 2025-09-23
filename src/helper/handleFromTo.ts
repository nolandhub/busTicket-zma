export function removeFromTo() {
    localStorage.removeItem("from")
    localStorage.removeItem("to")
}

export function addFromto(from: string, to: string) {
    localStorage.setItem("from", from)
    localStorage.setItem("to", to)
}
