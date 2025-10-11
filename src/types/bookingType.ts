import { BasePickDrop, PriceDetail } from "./tripType"

interface Option {
    label: string
    passCount: number
    total: number
}

//ghe don : SL:1 -> price -> 80000
//ghe doi : SL:2 -> price -> 160000

export interface BookingData {
    bookingId: string
    zaloId: string

    busId: string
    busName: string
    tripId: string
    tripName: string

    bookingName: string
    bookingPhone: string

    option?: Option[]
    totalAll: number

    pickUp: BasePickDrop           //Time here - PickUp
    dropOff: BasePickDrop          //Time here - DropOff

    createAt?: Date
}

export interface TicketData extends BookingData {
    busNumber: string
    seatName: string
    status: "pending" | "confirmed" | "used" | "cancelled"
    updateAt?: Date
}

export interface Ticket extends TicketData {
    id: string
}