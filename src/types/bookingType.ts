import { BasePickDrop } from "./tripType"

export interface Option {
    time: string;           // "08:00 - 10:00"
    label: string;          // "Phòng VIP"
    value: number;          // 600000
    quantity: number;       // 2
    subtotal: number;       // 1200000
    totalOptionPrice?: number; // Tổng giá option (optional, có thể duplicate với subtotal)
}

export interface BookingData {
    bookingId: string
    zaloId: string

    compId: string
    compName: string
    busName: string
    tripId: number
    routeName: string

    bookingDate: string

    //Scale --> future
    // isReturn: boolean
    // returnDate?: Date | null


    bookingName: string
    bookingPhone: string

    option: Option[]
    total: number
    totalPassCount: number

    pickUp: BasePickDrop | null            //Time here - PickUp
    dropOff: BasePickDrop | null       //Time here - DropOff

    pickUpValue: number | null
    dropOffValue: number | null

    pickUpNote: string
    dropOffNote: string

    createAt?: string
    updateAt?: Date

    isDelete: boolean
}

export type TicketStatus = "pending" | "confirmed" | "used" | "cancelled"

export interface Ticket extends Omit<BookingData, "pickUpValue" | "dropOffValue" | "pickUpNote" | "dropOffNote"> {
    id: string
    busNumber: string
    seatName: string
    status: TicketStatus
    cancelReason?: string
    updateAt?: Date
    createUser?: string
    updateUser?: string
}
