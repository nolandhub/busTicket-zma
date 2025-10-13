import { customAlphabet } from "nanoid";

const number = '1234567890'
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ1234567890'

const generateAlphabet = customAlphabet(alphabet, 5) // 6 ký tự
const generateNumber = customAlphabet(number, 1) // 1 char


export function generateTicketId() {
    return 'PRB' + generateNumber() + generateAlphabet()
}

export function generateBookingId() {
    return 'ORD' + generateNumber() + generateAlphabet()
}
