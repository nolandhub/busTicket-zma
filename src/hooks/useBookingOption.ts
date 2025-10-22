import { useState, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingState, selectedTripState, userState } from "@/state";
import { PriceDetail } from "@/types/tripType";
import { Option } from "@/types/bookingType";

export default function useBookingOption(price: PriceDetail) {
    const tripSelected = useRecoilValue(selectedTripState);
    const userData = useRecoilValue(userState);
    const setBooking = useSetRecoilState(bookingState);

    // User info
    const [name, setName] = useState(userData?.name || "");
    const [phone, setPhone] = useState(userData?.phone || "");

    // Quantities: { "detailIndex": quantity }
    // Ví dụ: { "0": 2, "1": 1 } => detail[0] có 2 vé, detail[1] có 1 vé
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    // Update quantity cho một detail item
    const updateQuantity = (detailIdx: number, change: number) => {
        setQuantities(prev => {
            const currentQty = prev[detailIdx] || 0;
            const newQty = Math.max(0, currentQty + change); // Không cho âm

            if (newQty === 0) {
                // Xóa key nếu quantity = 0
                const { [detailIdx]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [detailIdx]: newQty
            };
        });
    };

    // Build options array từ quantities
    const options: Option[] = useMemo(() => {
        const allOptions: Option[] = [];

        Object.entries(quantities).forEach(([detailIdxStr, qty]) => {
            const detailIdx = parseInt(detailIdxStr);
            const detail = price.detail[detailIdx];

            if (detail && qty > 0) {
                allOptions.push({
                    time: price.time || "",
                    label: detail.label,
                    value: detail.value,
                    quantity: qty,
                    subtotal: detail.value * qty,
                    passCount: qty,  //  passCount
                    totalOptionPrice: detail.value * qty  // Thêm totalOptionPrice
                });
            }
        });

        return allOptions;
    }, [quantities, price]);

    // Tính tổng tiền
    const total = useMemo(() => {
        return options.reduce((sum, option) => sum + option.subtotal, 0);
    }, [options]);

    const saveInfoStep = () => {
        if (!tripSelected) return;

        setBooking((prev) => ({
            ...prev,
            bookingId: "",
            zaloId: prev?.zaloId || userData?.id || "",
            compId: tripSelected.compId,
            compName: tripSelected.compName,
            busName: tripSelected.busName,
            tripId: tripSelected.id,
            tripName: tripSelected.routeName,
            bookingName: name,
            bookingPhone: phone,
            option: options, // Lưu options đã tính toán
            total,
            pickUp: prev?.pickUp || null,
            dropOff: prev?.dropOff || null,
        }));
    };

    return {
        tripSelected,
        name,
        phone,
        setName,
        setPhone,
        quantities,
        updateQuantity,
        total,
        options,
        saveInfoStep
    };
}