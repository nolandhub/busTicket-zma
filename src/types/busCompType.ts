export interface Policies {
    type: "cancel" | "child" | "pet"
    description: string[]

}

export interface BusCompany {
    compId: string
    compName: string
    avatar: string
    imagesInterior: string[]
    policies: Policies[]
}