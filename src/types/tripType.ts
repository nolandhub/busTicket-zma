
export interface SinglePrice {
    singlePrice: number
}

export interface RangePrice {
    rangePrice: number[]
}

export type Price = SinglePrice & RangePrice

export interface PriceDetail {
    label: string
    value: number
}


export interface SaleDetail {
    type: "fixed" | "percent"
    originPrice: Price      //singlePrice || rangePrice
    value: number         //200000đ || 50%    
    finalPrice: Price    //singlePrice || rangePrice
}

export interface FlashSale {
    saleDetail: SaleDetail
    startTime: Date;
    endTime: Date;
    isActive: boolean;
}

export interface Trip {
    routeId: string           //saigon-hanoi
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP
    typePrice: "fixed" | "byRoom" | "byRow"  // đồng giá || phòng || hàng
    price: Price     //giá gốc single || range
    priceDetail: PriceDetail | PriceDetail[]  //chi tiết giá vé
    flashSale?: FlashSale

    //Time + Location
    startLocation: string
    endLocation: string
    startTime: string
    duration: number     //minutes

    isDelete: boolean
}


