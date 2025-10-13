export interface SaleDetail {
    type: "fixed" | "percent"
    value: number                    //200000đ || 50%    
    finalPrice: PriceDetail | PriceDetail[]    //singlePrice || rangePrice
}

export interface FlashSale {
    saleDetail: SaleDetail
    endTime: string;
    isActive: boolean;
}

export interface BasePickDrop {
    title: string,
    subTitle: string,
    time: string
}

export interface PriceDetail {
    label: string
    value: number
}

export interface RouteDetails {
    //Time + Location
    key: string             // saigon
    startLocation: string
    endLocation: string
    startTime: string     //  04:00
    duration: string     // 10h 20p
    endTime: string      //  08:00

    //PickDrop
    pickUp: BasePickDrop[]
    dropOff: BasePickDrop[]
}

export interface TripData {
    routeId: string           //saigon-hanoi
    trip: string
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP
    typePrice: "fixed" | "byRoom" | "byRow"  // đồng giá || phòng || hàng
    price: PriceDetail | PriceDetail[]                 //giá gốc single || range
    flashSale: FlashSale | null
    routeConfig: {
        forward: RouteDetails
        backward: RouteDetails
    }
    updateAt?: Date
    isDelete: boolean
}

export interface Trip extends TripData {
    id: string
}

export interface TripFiltered extends Trip {
    activePickDrop: RouteDetails
}
