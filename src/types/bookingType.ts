import { BasePickDrop } from "./tripType"

interface Option {
    label: string
    passCount: number
    totalOptionPrice: number
}

export interface BookingData {
    bookingId: string
    zaloId: string

    busId: string
    busName: string
    tripId: string
    tripName?: string

    bookingName: string
    bookingPhone: string

    option?: Option[] | Option
    total: number

    pickUp: BasePickDrop | null           //Time here - PickUp
    dropOff: BasePickDrop | null         //Time here - DropOff

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