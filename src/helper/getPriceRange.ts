import { PriceByTime, PriceDetail } from "@/types/tripType";

export function getPriceRange(priceList: PriceByTime[], saleActive?: boolean) {
    // Lấy tất cả các giá trị từ detail của mỗi time slot
    const allValues: number[] = [];

    if (saleActive) {
        priceList.forEach(timeSlot => {
            timeSlot.detail.forEach(priceItem => {
                allValues.push(Number(priceItem.saleValue));
            });
        });
    } else {
        priceList.forEach(timeSlot => {
            timeSlot.detail.forEach(priceItem => {
                allValues.push(Number(priceItem.value));
            });
        });
    }

    if (allValues.length === 0) {
        return { isRange: false, value: 0 };
    }

    // Nếu chỉ có 1 giá trị hoặc tất cả giá trị giống nhau
    const uniqueValues = [...new Set(allValues)];
    if (uniqueValues.length === 1) {
        return {
            isRange: false,
            value: uniqueValues[0]
        };
    }

    // Có nhiều giá trị khác nhau
    return {
        isRange: true,
        min: Math.min(...allValues),
        max: Math.max(...allValues)
    };
}