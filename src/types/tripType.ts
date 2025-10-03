

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


export interface Trip {
    routeId: string           //saigon-hanoi
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP
    typePrice: "fixed" | "byRoom" | "byRow"  // đồng giá || phòng || hàng
    price: PriceDetail | PriceDetail[]                 //giá gốc single || range
    flashSale: FlashSale | null

    //Time + Location
    startLocation: string
    endLocation: string
    startTime: string
    duration: string     //minutes
    endTime: string

    //PickDrop
    pickUp: BasePickDrop[]
    dropOff: BasePickDrop[]

    isDelete: boolean
}

