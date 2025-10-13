import { generateBookingId } from "@/helper/generateID";
import { getFullLabelFromValue } from "@/helper/getLabelFromValue";
import { bookingState, selectedTripState, userState } from "@/state";
import { BookingData } from "@/types/bookingType";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSnackbar } from "zmp-ui";

export const useBookingOption = (priceArray) => {
    const userInfo = useRecoilValue(userState)
    const [name, setName] = useState(userInfo?.name)
    const [phone, setPhone] = useState(userInfo?.phone)
    const setBookingData = useSetRecoilState(bookingState)
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const { openSnackbar } = useSnackbar()
    const tripSelected = useRecoilValue(selectedTripState)

    const updateQuantity = (label: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [label]: Math.max((prev[label] || 0) + delta, 0),
        }));
    };

    const total = priceArray.reduce(
        (sum, p) => sum + (quantities[p.label] || 0) * p.value, 0
    );

    const saveInfoStep = () => {
        if (!tripSelected) {
            openSnackbar({
                icon: true,
                text: "Vui lòng chọn chuyến trước khi cập nhật thông tin!",
            });
            return;
        }
        const selectedOptions = priceArray
            .filter((p) => (quantities[p.label] || 0) > 0)
            .map((p) => ({
                label: p.label,
                passCount: quantities[p.label],
                totalOptionPrice: (quantities[p.label] || 0) * p.value,
            }));

        const bookingData: BookingData = {
            bookingId: generateBookingId(),
            zaloId: userInfo?.id || "",
            busId: tripSelected.compId,
            busName: tripSelected.compName,
            tripId: tripSelected.id,
            tripName: getFullLabelFromValue(tripSelected.routeId),

            bookingName: name || "",
            bookingPhone: phone || "",

            option: selectedOptions,
            total: total,
            dropOff: null,
            pickUp: null,

            createAt: new Date(),
        };
        // console.log(bookingData)
        setBookingData(bookingData);
    };

    return {
        saveInfoStep,
        quantities,
        updateQuantity,
        total,
        name,
        setName,
        phone,
        setPhone
    };
};
