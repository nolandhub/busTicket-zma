//User INFO
export interface coreData {
    id: string
    name: string
    avatar: string
    phone?: string
    role?: string
    totalSpending?: number
    createAt?: Date
}


// Dữ liệu cá nhân chỉ lưu ở local
export type userCached = coreData & {
    gender?: string
    dob?: string
    address?: string
    favorite?: string
    isRegistered?: boolean
}













