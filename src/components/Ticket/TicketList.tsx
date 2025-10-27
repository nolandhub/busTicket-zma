import { FC } from "react";
import { Box, Icon, Text } from "zmp-ui";
import TicketItem from "./TicketItem";
import { PackageOpenIcon, } from "lucide-react";
import { Ticket } from "@/types/bookingType";
import useTicket from "@/hooks/useTicket";



const TicketList: FC<{ ticketFilter: Ticket[], isLoadingClick?: boolean, onClick?: () => void, handleSetTicket: (data) => void }> = ({ ticketFilter, isLoadingClick, onClick, handleSetTicket }) => {
    if (ticketFilter.length === 0) {
        return (
            <Box className="flex-1 h-[78vh] flex items-center justify-center">
                <Box className="flex flex-col items-center text-center ">
                    <PackageOpenIcon size={40} />
                    <Text.Header>
                        Hiện không có đơn hàng nào
                    </Text.Header>
                    <Box onClick={onClick} className="flex gap-2 justify-center items-center mt-2 hover:bg-slate-200">
                        <Icon className={`${isLoadingClick ? "animate-spin" : ""}`} icon="zi-retry-solid" size={25} />
                        <Text className="text-slate-600">
                            Làm mới để cập nhật
                        </Text>
                    </Box>
                </Box>
            </Box >
        )
    }
    return (
        <>
            {
                ticketFilter.map((t, idx) => (<TicketItem key={idx} onCick={(data) => handleSetTicket(data)} dataTicket={t} />))
            }
        </>
    )
}

export default TicketList