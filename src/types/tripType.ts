export interface PriceDetail {
    time: string
    detail: {
        label: string
        value: number
    }[]
}

export interface SaleDetail {
    saleId: string
    label: string
    type: "fixed" | "percent"
    value: number
    startDate: string
    endDate: string
    updateAt: string
    isActive: boolean
}


export interface BasePickDrop {
    title: string,
    subTitle: string
}

export interface RouteDetails {
    // + Location
    key: string             // saigon
    startLocation: string   //default
    endLocation: string     //default

    //PickDrop
    pickUp: BasePickDrop[]
    dropOff: BasePickDrop[]
}

export interface TripData {
    routeId: string            //saigon-hanoi
    routeName: string         //Sai Gon - Ha Noi
    compId: string           //cuctung
    compName: string        //Cuc Tung Limousine
    busName: string        //Limousine 20 Phòng Đôi VIP

    //Price
    priceType: "fixed" | "byRoom" | "byRow"
    price: PriceDetail[]

    saleId?: string | null
    snapShotSale?: SaleDetail | null
    salePrice?: PriceDetail[] | null

    routeConfig: {
        forward: RouteDetails
        backward: RouteDetails
    }

    createAt: Date  //to ISOString
    updateAt: Date  //to ISOString
    isDelete: boolean
}

export interface Trip extends TripData {
    id: string
}

export interface TripFiltered extends Trip {
    activePickDrop: RouteDetails
}




