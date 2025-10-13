import { useState } from "react";
import { Box, Button, Icon, useSnackbar, Text } from "zmp-ui";
import InfoOption from "./InfoOption";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingState, selectedTripState } from "@/state";
import PickDrop from "./PickDrop";
import { BasePickDrop } from "@/types/tripType";
import BookingReview from "./ReviewBooking";

export default function BookingStep() {
    const [step, setStep] = useState<"info" | "selectPlace" | "review">("info")
    const tripSelected = useRecoilValue(selectedTripState)
    const setBookingData = useSetRecoilState(bookingState)
    const dataBooking = useRecoilValue(bookingState)
    const { openSnackbar } = useSnackbar()

    if (!tripSelected) {
        return (
            <></>
        )
    }

    function handlePickDrop(pickUp: BasePickDrop | null, dropOff: BasePickDrop | null) {
        if (pickUp && dropOff) {
            setBookingData(prev => {
                if (!prev) return null; // Hoặc return giá trị mặc định
                return {
                    ...prev,
                    pickUp,
                    dropOff
                }
            })
        }
    }

    function handleClick() {
        if (step == "info") {
            if (!dataBooking?.bookingName || !dataBooking?.bookingPhone) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng kiểm tra lại tên/ số điện thoại",
                });
            } else if (!dataBooking?.total || dataBooking.total === 0) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng chọn số lượng loại vé mà bạn muốn đặt",
                });
            } else {
                setStep("selectPlace")
            }

        } else if (step == "selectPlace") {
            setStep("review")
        }

    }


    return (
        <Box className="flex flex-col gap-4 justify-center">
            <Box className="flex-1 pt-4">
                {step === "info" && (
                    <InfoOption flashSale={tripSelected?.flashSale} originPrice={tripSelected?.price} />
                )}

                {step === "selectPlace" && (
                    <PickDrop
                        dropOff={tripSelected.activePickDrop.dropOff}
                        pickUp={tripSelected.activePickDrop.pickUp}
                        onSelectionChange={handlePickDrop}
                    />
                )}
                {step === "review" && dataBooking && <BookingReview data={dataBooking} />}
            </Box>
            <Box className="sticky flex justify-end">
                <Button suffixIcon={<Icon icon="zi-arrow-right" />} onClick={handleClick}>
                    Tiếp tục
                </Button>
            </Box>

        </Box >
    )


}