import { BasePickDrop } from "./tripType"

export interface Option {
    time: string;           // "08:00 - 10:00"
    label: string;          // "Phòng VIP"
    value: number;          // 600000
    quantity: number;       // 2
    subtotal: number;       // 1200000
    passCount?: number;     // Số lượng hành khách (optional)
    totalOptionPrice?: number; // Tổng giá option (optional, có thể duplicate với subtotal)
}

export interface BookingData {
    bookingId: string
    zaloId: string | ''

    compId: string
    compName: string
    busName: string
    tripId: string
    tripName: string

    bookingName: string
    bookingPhone: string

    option?: Option[] | null
    total?: number

    pickUp: BasePickDrop | null            //Time here - PickUp
    dropOff: BasePickDrop | null       //Time here - DropOff

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