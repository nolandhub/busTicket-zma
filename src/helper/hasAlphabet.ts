export const hasAlphabet = (phone: string): boolean => {
    return /[a-zA-Z]/.test(phone);
}
