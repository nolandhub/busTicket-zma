
//User INFO
export interface zaloUser {
    id: string
    name: string
    avatar: string
}

// Dữ liệu mở rộng trong Firestore
export interface firestoreUser {
    phone?: string
    role?: string
    totalSpending?: number
}

export type storedData = zaloUser & firestoreUser | null



// Dữ liệu cá nhân chỉ lưu ở local
export type userCached = zaloUser & firestoreUser & {
    gender?: string
    dob?: string
    address?: string
    favorite?: string
    isRegistered?: boolean
}













