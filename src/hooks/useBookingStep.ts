import { addTicket } from "@/firebase/firestore/ticketCrud"
import { generateBookingId, generateTicketId } from "@/helper/generateID"
import { hasAlphabet } from "@/helper/hasAlphabet"
import { idbService } from "@/indexDB/idbServices"
import { bookingState, priceOptionState, selectedTripState } from "@/state"
import { BookingData, Ticket } from "@/types/bookingType"
import { BasePickDrop } from "@/types/tripType"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { useNavigate, useSnackbar } from "zmp-ui"

export default function useBookingStep() {
    const [step, setStep] = useState<"time" | "info" | "review">("time")
    const [loading, setLoading] = useState<boolean>(false)
    const tripSelected = useRecoilValue(selectedTripState)
    const dataBooking = useRecoilValue(bookingState)
    const priceOpt = useRecoilValue(priceOptionState)
    const resetPriceOpt = useResetRecoilState(priceOptionState)
    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar()
    const [pickData, setPickData] = useState<BasePickDrop | null>(null)
    const [dropData, setDropData] = useState<BasePickDrop | null>(null)
    const resetBooking = useResetRecoilState(bookingState)


    const [hiddenStepBtn, setHiddenStepBtn] = useState<boolean>(false)

    useEffect(() => {
        if (step == "review") {
            setHiddenStepBtn(true)
        } else if (step == "info" || "time") {
            setHiddenStepBtn(false)
        }
    }, [step])

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
            } else if (dataBooking.pickUpValue == 999 && !dataBooking.pickUpNote || dataBooking.dropOffValue == 1000 && !dataBooking.dropOffNote) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng điền đầy đủ thông tin trung chuyển!...",
                });
            } else if (dataBooking.bookingPhone.length < 10 || hasAlphabet(dataBooking.bookingPhone)) {
                openSnackbar({
                    icon: true,
                    text: "Số điện thoại không hợp lệ. Xin hãy nhập lại!",
                });
            } else if (!dataBooking.dropOff || !dataBooking.pickUp) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng chọn thông tin cho điểm đón/ trả",
                });
            } else {
                setStep("review")
            }


        }
    }
    function handleConfirm(dataBooking, messageToken) {
        try {
            setLoading(true)

            const confirmData: BookingData = {
                ...dataBooking,
                bookingId: generateBookingId(),
                messageToken,
                createAt: new Date().toISOString()
            }

            const ticketData: Ticket = {
                ...confirmData,
                id: generateTicketId(),
                status: "pending",
                busNumber: "",
                seatName: "",
                createUser: dataBooking.zaloId
            }

            addTicket(ticketData)
            idbService.add("tickets", ticketData)

            axios.post("https://216tvbfb-3000.asse.devtunnels.ms/api/zalo-send-status", {
                userId: ticketData.zaloId,
                customerName: ticketData.bookingName,
                route: ticketData.routeName,
                status: "Đặt thành công"
            })

            navigate("/ticket")
            openSnackbar({
                text: "Đặt vé thành công! Hãy để ý điện thoại.",
                type: "success"
            })

            resetBooking()
        } catch (error) {
            console.error(error)
            openSnackbar({
                text: "Đặt vé thất bại! Vui lòng thử lại.",
                type: "error"
            })
        } finally {
            setLoading(false)
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
        loading,
        hiddenStepBtn,
    }
}

