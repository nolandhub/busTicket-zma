
import { Policies } from "./busCompType";

export interface PercentSale {
    type: "percent";
    percent: number;
    maxAmount: number;
}

export interface FixedSale {
    type: "fixed";
    amount: number;
}

export type Sale = PercentSale | FixedSale;


export type PriceDetail = {
    label: string
    price: number
    note?: string
}


export interface basePickDrop {
    title: string,
    subTitle: string,
    time: string
}

export interface FlashSale {
    sale: Sale
    isActive: boolean
    expires_in: number
}


export interface Trip {
    routeId: string           //saigon-hanoi
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP
    type: "fixed" | "byRoom" | "byRow"  //đồng giá || phòng || hàng
    priceDetail: PriceDetail | PriceDetail[]
    flashSale?: FlashSale

    //Time + Location
    startLocation: string
    endLocation: string
    startTime: Date      //schedule -> Date -> handle -> parseEndTime -> Save FireStore
    duration: number
    endTime: Date


    pickUp: basePickDrop[]
    dropOff: basePickDrop[]
    policies: Policies[]

    //Schedule
    schedule: string[]
}


