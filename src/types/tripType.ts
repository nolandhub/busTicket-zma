
import { Policies } from "./busCompType";

export interface PercentSale {
    type: "percent";
    percent: number;
}

export interface FixedSale {
    type: "fixed";
    amount: number;
}

export type Sale = PercentSale | FixedSale;


//TRIP PRICE TYPE  
export interface FixedPrice {
    type: "fixed"
    label: string
    price: number
    note?: string
}

export interface ByRoom {
    type: "byRoom"
    label: string
    price: number
    note?: string
}

export interface ByRow {
    type: "byRow"
    label: string
    price: number
    note?: string
}

export type PricingPolicy = FixedPrice | ByRoom[] | ByRow[]


export interface basePickDrop {
    title: string,
    subTitle: string,
    time: string
}


export interface Trip {
    routeId: string           //saigon-hanoi
    compId: string           //cuctung
    compName: string        // Cuc Tung Limousine
    busName: string         //Limousine 20 Phòng Đôi VIP 
    avatar: string            //"https://google.com"
    imageInterior: string[]    //["https://google.com","https://google.com","https://google.com","https://google.com"]
    defStartPoint: string
    defEndPoint: string
    price: PricingPolicy
    sale?: Sale
    pickUp: basePickDrop[]
    dropOff: basePickDrop[]
    policies: Policies[]
    schedule: string[]

}


