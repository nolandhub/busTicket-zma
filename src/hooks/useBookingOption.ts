import { useState, useMemo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookingState, selectedTripState, userState } from "@/state";
import { PriceByTime, PriceDetail } from "@/types/tripType";
import { Option } from "@/types/bookingType";
import useCoreInit from "./useCoreInit";

export default function useBookingOption(price: PriceByTime) {
    const tripSelected = useRecoilValue(selectedTripState);
    const userData = useRecoilValue(userState);

    const [dataBooking, setBooking] = useRecoilState(bookingState);

    const { isReturn, returnDate, departDate } = useCoreInit()

    // User info - Khởi tạo từ Recoil state trước, fallback về userData
    const [name, setName] = useState(
        userData?.name || dataBooking.bookingName || ""
    );

    const [phone, setPhone] = useState(
        userData?.phone || dataBooking.bookingPhone || ""
    );

    // Quantities: Khởi tạo từ Recoil state nếu có
    const [quantities, setQuantities] = useState<Record<number, number>>(() => {
        // Restore quantities từ options đã lưu trong dataBooking
        if (dataBooking.option && dataBooking.option.length > 0) {
            const restoredQuantities: Record<number, number> = {};

            dataBooking.option.forEach(opt => {
                // Tìm index của detail item dựa vào label và value
                const detailIdx = price.detail.findIndex(
                    d => d.label === opt.label && d.value === opt.value
                );

                if (detailIdx !== -1 && opt.quantity > 0) {
                    restoredQuantities[detailIdx] = opt.quantity;
                }
            });

            return restoredQuantities;
        }

        return {};
    });

    // Update quantity cho một detail item
    const updateQuantity = (detailIdx: number, change: number) => {
        setQuantities(prev => {
            const currentQty = prev[detailIdx] || 0;
            const newQty = Math.max(0, currentQty + change);

            if (newQty === 0) {
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
                    totalOptionPrice: detail.value * qty
                });
            }
        });

        return allOptions;
    }, [quantities, price]);

    // Tính tổng tiền
    const total = useMemo(() => {
        return options.reduce((sum, option) => sum + option.subtotal, 0);
    }, [options]);

    const totalPassCount = useMemo(() => {
        return options.reduce((sum, option) => sum + option.quantity, 0);
    }, [options]);

    // Auto-save vào Recoil state khi có thay đổi
    useEffect(() => {
        if (!tripSelected) return;
        setBooking((prev) => ({
            ...prev,
            bookingName: name,
            bookingPhone: phone,
            option: options,
            total: total,
            passCount: totalPassCount
        }));
    }, [name, phone, options, total, tripSelected]);

    const saveInfoStep = () => {
        if (!tripSelected) return;

        setBooking((prev) => ({
            ...prev,
            //identity
            bookingId: "",
            zaloId: prev?.zaloId || userData?.id || "",

            //trip
            compId: tripSelected.compCode,
            compName: tripSelected.compName,
            busName: tripSelected.busName,
            tripId: tripSelected.tripId,
            routeName: tripSelected.routeName,

            //date
            bookingDate: departDate.toISOString(),

            //infoUser
            bookingName: name,
            bookingPhone: phone,
            option: options,
            total,
            totalPassCount,

            //pickDrop
            pickUp: dataBooking.pickUp,
            dropOff: dataBooking.pickUp
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
        saveInfoStep,
        returnDate,
        departDate,
        isReturn,
        dataBooking
    };
}