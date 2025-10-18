import { PriceDetail } from "@/types/tripType";

// Helper: Tính min/max từ PriceDetail[]
export function getPriceRange(priceList: PriceDetail[]) {
    // Lấy tất cả các giá trị từ detail của mỗi time slot
    const allValues: number[] = [];

    priceList.forEach(timeSlot => {
        timeSlot.detail.forEach(priceItem => {
            allValues.push(Number(priceItem.value));
        });
    });

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