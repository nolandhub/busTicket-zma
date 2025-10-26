import { addTicket } from "@/firebase/firestore/ticketCrud"
import { generateBookingId, generateTicketId } from "@/helper/generateID"
import { idbService } from "@/indexDB/idbServices"
import { bookingState, priceOptionState, selectedTripState, ticketState } from "@/state"
import { BookingData, Ticket } from "@/types/bookingType"
import { BasePickDrop } from "@/types/tripType"
import { useEffect, useState } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
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
            } else if (dataBooking.pickUpValue == "999" && !dataBooking.pickUpNote || dataBooking.dropOffValue == "1000" && !dataBooking.dropOffNote) {
                openSnackbar({
                    icon: true,
                    text: "Vui lòng điền đầy đủ thông tin trung chuyển!...",
                });
            } else {
                setStep("review")
            }
        }
    }

    function handleConfirm(dataBooking) {
        try {
            setLoading(true)
            const confirmData: BookingData = {
                ...dataBooking,
                bookingId: generateBookingId(),
                createAt: new Date().toISOString()
            }
            const ticketData: Ticket = {
                ...confirmData,
                id: generateTicketId(),
                status: "pending",
                busNumber: "",
                seatName: "",
                createUser: dataBooking.zaloId,
            }

            addTicket(ticketData)
            idbService.add("tickets", ticketData)

            setTimeout(() => {
                setLoading(false)
                navigate("/ticket")
                openSnackbar({
                    text: "Đặt vé thành công! Hãy để ý điện thoại, nhân viên sẽ sớm gọi bạn . Cảm ơn !",
                    type: "success"
                })
                resetBooking()
            }, 1400)



        } catch (error) {
            console.log(error)
            setLoading(false)
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
        loading,
        hiddenStepBtn,
    }
}

