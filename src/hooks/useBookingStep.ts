import { bookingState, priceOptionState, selectedTripState } from "@/state"
import { BasePickDrop } from "@/types/tripType"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { useNavigate, useSnackbar } from "zmp-ui"

export default function useBookingStep() {
    const [step, setStep] = useState<"time" | "info" | "review">("time")
    const tripSelected = useRecoilValue(selectedTripState)
    const dataBooking = useRecoilValue(bookingState)
    const priceOpt = useRecoilValue(priceOptionState)
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar()
    const [pickData, setPickData] = useState<BasePickDrop | null>(null)
    const [dropData, setDropData] = useState<BasePickDrop | null>(null)

    function handleNext() {
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
                    text: "Vui lòng kiểm tra lại tên/ số điện thoại.",
                });
            } else if (!dataBooking?.total || dataBooking.total === 0) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng chọn số lượng vé!..",
                });
            } else {
                setStep("review")
            }
        }
    }

    function handleOrder(messageToken) {
        if (messageToken) {
            console.log("cha gọi")
            console.log(messageToken)
        }

    }

    function handleBack() {
        if (step == "time") {
            navigate(-1)
        } else if (step == "info") {
            setStep("time")
        } else {
            setStep("info")
        }
    }

    return {
        pickData, setPickData,
        dropData, setDropData,
        dataBooking,
        priceOpt,
        tripSelected,
        step,
        handleNext,
        handleBack,
        handleOrder
    }

}

