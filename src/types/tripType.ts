export interface PriceDetail {
    label: string
    value: number
}

export interface SaleDetail {
    type: "fixed" | "percent"
    value: number                    //200000đ || 50%    
    finalPrice: number | number[]    //singlePrice || rangePrice
}


export interface FlashSale {
    saleDetail: SaleDetail
    endTime: Date;
    isActive: boolean;
}

export interface Trip {
    routeId: string           //saigon-hanoi
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP
    typePrice: "fixed" | "byRoom" | "byRow"  // đồng giá || phòng || hàng
    price: number | number[]                 //giá gốc single || range
    priceDetail: PriceDetail | PriceDetail[]  //chi tiết giá vé
    flashSale: FlashSale | null

    //Time + Location
    startLocation: string
    endLocation: string
    startTime: string
    duration: string     //minutes
    endTime: string

    isDelete: boolean
}

