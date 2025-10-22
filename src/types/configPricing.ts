import { PriceDetail, SaleDetail } from "./tripType"

export interface BaseRule {
    finalPrice: PriceDetail[]       // Giá áp dụng cho nhóm ngày này
    saleId?: string | null
    saleSnapShot?: SaleDetail | null
}

export interface WeekPriceRule extends BaseRule {
    day: number[]           // ví dụ [0,1,2,3,4,5,6]  7 day of week
}

export interface DatePriceRule extends BaseRule {
    date: string
}

export interface MonthPriceRule extends BaseRule {
    dateRange?: { start: string, end: string } | null
}

export interface PricingRule {
    routeId: string
    compId: string
    type: "holiday" | "daily" | "monthly"
    holiday?: DatePriceRule[] | null
    weekOfDay?: WeekPriceRule[] | null
    month?: MonthPriceRule[] | null
    isActive: boolean
    createAt: Date   //to ISO String
    updateAt: Date    //to ISO String
}

//Date[] -> Month -> WeekOfDay -> Default -> None(Call)

