import { PriceDetail, SaleDetail } from "./tripType"

export interface BaseRule {
    finalPrice: PriceDetail[]       // Giá áp dụng cho nhóm ngày này
    saleId?: string | null
    saleSnapShot?: SaleDetail | null
}

export interface WeekPriceRule extends BaseRule {
    day: number[]           // ví dụ [2,3,4]
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
    type: "special" | "normal" | "custom"
    name?: string
    holiday?: DatePriceRule[] | null
    weekOfDay?: WeekPriceRule[] | null
    month?: MonthPriceRule[] | null
    isActive: boolean
    createAt: Date   //to ISOString
    updateAt: Date    //to ISOString 
}



//Date[] -> Month -> WeekOfDay -> Default -> None(Call)

