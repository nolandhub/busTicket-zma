export interface Policies {
    title: string,
    description: string[]
}

export interface BusCompanyData {
    compId: string
    compName: string
    avatar: string
    imagesInterior: string[]
    policies: Policies[]
    updateAt?: Date
}

export interface BusCompany extends BusCompanyData {
    id: string
}
