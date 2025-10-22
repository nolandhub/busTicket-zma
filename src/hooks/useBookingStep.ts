import { addTicket } from "@/firebase/firestore/ticketCrud"
import { generateBookingId, generateTicketId } from "@/helper/generateID"
import { idbService } from "@/indexDB/idbServices"
import { bookingState, priceOptionState, selectedTripState } from "@/state"
import { BookingData, Ticket } from "@/types/bookingType"
import { BasePickDrop } from "@/types/tripType"
import { useState } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { useNavigate, useSnackbar } from "zmp-ui"

export default function useBookingStep() {
    const [step, setStep] = useState<"time" | "info" | "review">("time")
    const tripSelected = useRecoilValue(selectedTripState)
    const dataBooking = useRecoilValue(bookingState)
    const priceOpt = useRecoilValue(priceOptionState)
    const resetPriceOpt = useResetRecoilState(priceOptionState)
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar()
    const [pickData, setPickData] = useState<BasePickDrop | null>(null)
    const [dropData, setDropData] = useState<BasePickDrop | null>(null)
    const resetBooking = useResetRecoilState(bookingState)


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



    function handleConfirm(dataBooking) {
        try {
            const confirmData: BookingData = {
                ...dataBooking,
                bookingId: generateBookingId(),
                createAt: new Date()
            }
            const ticketData: Ticket = {
                ...confirmData,
                id: generateTicketId(),
                status: "pending",
                busNumber: "",
                seatName: ""
            }

            addTicket(ticketData)
            idbService.add("tickets", ticketData)

            // navigate("/ticket")


            openSnackbar({
                text: "Đặt vé thành công! Hãy để ý điện thoại, nhân viên sẽ sớm gọi bạn . Cảm ơn !",
                type: "success"
            })

            console.log(ticketData)
        } catch (error) {
            console.log(error)
            openSnackbar({
                text: "Xảy ra lỗi trong quá trình tạo order, vui lòng thử lại",
                type: "error"
            })
        }

    }


    function handleBack() {
        if (step == "time") {
            navigate(-1)
        } else if (step == "info") {
            resetBooking()
            resetPriceOpt()
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
        handleConfirm,
    }

}

