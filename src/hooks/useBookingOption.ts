import { useState, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingState, departureDateState, selectedTripState } from "@/state";
import dayjs from "dayjs";
import { BasePickDrop, PriceDetail, SaleDetail } from "@/types/tripType";
import { Option } from "@/types/bookingType";

export function useBookingOption(
    price: PriceDetail[],
    salePrice?: PriceDetail[] | null,
    snapShotSale?: SaleDetail | null
) {
    const tripSelected = useRecoilValue(selectedTripState);
    const departDate = useRecoilValue(departureDateState);
    const setBooking = useSetRecoilState(bookingState);

    // User info
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Pick & Drop selections
    const [pickUp, setPickUp] = useState<BasePickDrop | null>(null);
    const [dropOff, setDropOff] = useState<BasePickDrop | null>(null);

    // Quantities: { "timeSlot-detailIndex": quantity }
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    // Selected detail indexes cho mỗi time slot
    const [selectedDetailIndexes, setSelectedDetailIndexes] = useState<Record<number, number>>({});

    // Kiểm tra sale có active không
    const isSaleActive = useMemo(() => {
        if (!snapShotSale?.isActive || !salePrice) return false;
        const depart = dayjs(departDate);
        const saleEnd = dayjs(snapShotSale.endDate);
        return !depart.isAfter(saleEnd);
    }, [snapShotSale, salePrice, departDate]);

    // Quyết định hiển thị giá nào
    const displayPrice = isSaleActive && salePrice ? salePrice : price;

    // Generate key cho quantity tracking
    const generateKey = (priceDetail: PriceDetail, detailIndex: number) => {
        return `${priceDetail.time}-${detailIndex}`;
    };

    // Update quantity
    const updateQuantity = (timeSlotIdx: number, detailIdx: number, change: number) => {
        const priceDetail = displayPrice[timeSlotIdx];
        const key = generateKey(priceDetail, detailIdx);

        setQuantities(prev => {
            const currentQty = prev[key] || 0;
            const newQty = Math.max(0, currentQty + change);

            if (newQty === 0) {
                const { [key]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [key]: newQty };
        });
    };

    // Update selected detail index cho time slot
    const updateSelectedDetail = (timeSlotIdx: number, detailIdx: number) => {
        setSelectedDetailIndexes(prev => ({
            ...prev,
            [timeSlotIdx]: detailIdx
        }));
    };

    // Build options array
    const options: Option[] = useMemo(() => {
        const allOptions: Option[] = [];

        displayPrice.forEach((priceDetail, timeSlotIdx) => {
            priceDetail.detail.forEach((detailItem, detailIdx) => {
                const key = generateKey(priceDetail, detailIdx);
                const qty = quantities[key] || 0;

                if (qty > 0) {
                    const itemValue = Number(detailItem.value);
                    const itemSubtotal = itemValue * qty;

                    allOptions.push({
                        time: priceDetail.time,
                        label: detailItem.label,
                        value: itemValue,
                        quantity: qty,
                        subtotal: itemSubtotal,
                        passCount: qty, // Same as quantity
                        totalOptionPrice: itemSubtotal // Same as subtotal
                    });
                }
            });
        });

        return allOptions;
    }, [quantities, displayPrice]);

    // Tính tổng tiền
    const total = useMemo(() => {
        return options.reduce((sum, option) => sum + option.subtotal, 0);
    }, [options]);

    // Handle pick/drop selection
    const handlePickDrop = (pickup: BasePickDrop, dropoff: BasePickDrop) => {
        setPickUp(pickup);
        setDropOff(dropoff);
    };

    // Save booking info
    const saveInfoStep = () => {
        if (!tripSelected) return;

        const bookingData = {
            bookingId: "", // Will be generated when submitting
            zaloId: "", // Will be filled from user context

            compId: tripSelected.compId,
            compName: tripSelected.compName,
            busName: tripSelected.busName,
            tripId: tripSelected.id,
            tripName: tripSelected.routeName,

            bookingName: name,
            bookingPhone: phone,

            option: options,
            total,

            pickUp,
            dropOff,

            createAt: new Date()
        };

        setBooking(bookingData);
    };

    return {
        tripSelected,
        handlePickDrop,
        name,
        phone,
        setName,
        setPhone,
        quantities,
        selectedDetailIndexes,
        updateQuantity,
        updateSelectedDetail,
        total,
        options,
        saveInfoStep,
        displayPrice
    };
}