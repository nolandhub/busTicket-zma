import { updateTicket } from "@/firebase/firestore/ticketCrud";
import { ticketState } from "@/state";
import { Ticket } from "@/types/bookingType";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "zmp-ui";


export default function useTicket() {
    const ticketData = useRecoilValue(ticketState)
    const [isLoadingClick, setIsLoadingClick] = useState<boolean>(false)
    const { openSnackbar } = useSnackbar()
    const [ticketSelected, setTicketSelected] = useState<Ticket | null>(null)
    const [isCancel, setCancel] = useState<boolean>(false)

    const handleRefresh = () => {
        setIsLoadingClick(true)
        setTimeout(() => {
            openSnackbar({
                type: "success",
                text: "Dữ liệu đã được làm mới"
            })
            setIsLoadingClick(false)
        }, 1200)
    }

    const currentTickets = ticketData.filter(
        (t) => t.status === "pending" || t.status === "confirmed"
    );
    const usedTickets = ticketData.filter((t) => t.status === "used");
    const cancelledTickets = ticketData.filter((t) => t.status === "cancelled");
    const [visible, setVisible] = useState<boolean>(false)
    const [cancelReason, setCancelReason] = useState<string>("")





    const handleCancel = () => {
        if (ticketSelected?.status === "cancelled") {
            return openSnackbar({
                type: "info",
                text: "Vé đã hủy, cần biết thêm thông tin chi tiết. Xin hãy liên hệ nhân viên tư vấn"
            })
        }

        const preCancel = {
            cancelReason: cancelReason || "",
            status: "cancelled",
            updateAt: new Date(),
            updateUser: ticketSelected?.zaloId
        }

        if (ticketSelected?.status === "pending") {
            if (!isCancel) {
                setCancel(true)
            } else if (preCancel.cancelReason.length === 0) {
                return openSnackbar({
                    type: "error",
                    text: "Hãy nhập lý do để chúng tôi phục vụ bạn tốt hơn. Cảm ơn bạn!.."
                })
            } else {
                setTimeout(() => {
                    openSnackbar({
                        type: "success",
                        text: "Hủy thành công"
                    })
                    updateTicket(ticketSelected!.id, preCancel)
                    setCancelReason("")
                    setTicketSelected(null)
                    setCancel(false)
                }, 1200)
            }
        }
    }

    const handleChange = (val) => {
        setCancelReason(val)
    }

    return {
        visible, setVisible,
        cancelledTickets,
        currentTickets,
        usedTickets,
        isLoadingClick,
        handleRefresh,
        ticketSelected, setTicketSelected,
        isCancel,
        handleCancel,
        handleChange
    }
}