export interface BasePickDrop {
    title: string,
    subTitle: string,
    time: string
}

export interface CompanyRoute {
    routeId: string
    companyId: string

    //PickDrop
    pickUp: BasePickDrop[]
    dropOff: BasePickDrop[]
}
