import { useEffect, useState } from "react";
import { Box, Button, Icon, useSnackbar } from "zmp-ui";
import InfoOption from "./InfoOption";
import { useRecoilValue } from "recoil";
import { bookingState, priceOptionState, selectedTripState } from "@/state";
import BookingReview from "./ReviewBooking";
import SelectTime from "./SelectTime";

export default function BookingStep() {
    const [step, setStep] = useState<"time" | "info" | "review">("time")
    const tripSelected = useRecoilValue(selectedTripState)
    const dataBooking = useRecoilValue(bookingState)
    const { openSnackbar } = useSnackbar()
    const priceOpt = useRecoilValue(priceOptionState)


    if (!tripSelected) {
        return null
    }

    function handleClick() {
        if (step == "time") {
            if (!priceOpt) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng chọn thời gian xuất bến!",
                });
            } else {
                setStep("info")
            }
        }

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
                setStep("review")
            }
        }
    }


    return (
        <Box className="flex flex-col gap-4 justify-center bg-slate-100">
            <Box className="flex-1 pt-4">
                {
                    step === "time" && (
                        <SelectTime
                            snapShotSale={tripSelected?.snapShotSale}
                            salePrice={tripSelected?.salePrice}
                            price={tripSelected?.price}
                        />
                    )
                }
                {step === "info" && (
                    <InfoOption
                        price={tripSelected.price}
                        salePrice={tripSelected.salePrice}
                        snapShotSale={tripSelected.snapShotSale}
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