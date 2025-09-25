import { FlashSale } from "@/types/tripType";

export const calculateFinalTripPrice = (originPrice: number, discount?: FlashSale): number => {

    let finalPrice
    if (discount?.sale.type == "fixed" && discount.sale.amount) {
        finalPrice = originPrice - discount.sale.amount
    }

    if (discount?.sale.type == "percent" && discount.sale.percent) {
        const discountValue = (originPrice * (1 - discount.sale.percent / 100))

        const actualAmount = discount.sale.maxAmount ? Math.min(discountValue, discount.sale.maxAmount) : discountValue

        finalPrice = originPrice - actualAmount
    }

    return Math.max(0, finalPrice)

}