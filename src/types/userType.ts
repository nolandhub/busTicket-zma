//User INFO
export interface CoreData {
    id: string
    name: string
    avatar: string
    phone?: string
    role?: string
    totalSpending?: number
    createAt?: Date
    updateAt?: Date
}


// Dữ liệu cá nhân chỉ lưu ở local
export type UserCached = CoreData & {
    gender?: string
    dob?: string
    address?: string
    favorite?: string
}













