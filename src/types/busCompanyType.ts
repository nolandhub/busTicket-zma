export interface Policies {
    title: string,
    description: string[]
}

export interface BusCompany {
    compId: string  
    compName: string
    avatar: string
    imagesInterior: string[]
    policies: Policies[]
}
