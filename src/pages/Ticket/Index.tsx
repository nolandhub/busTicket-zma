import { Box, Page, Spinner, Text } from "zmp-ui";
import { Tabs } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import TicketList from "@/components/Ticket/TicketList";
import useTicket from "@/hooks/useTicket";
import { useSubcribeTicket } from "@/firebase/firestore/ticketCrud";


export default function TicketPage() {
    const { currentTickets, usedTickets, cancelledTickets, isLoadingClick, handleRefresh } = useTicket()
    const { loadingTicket } = useSubcribeTicket()

    if (loadingTicket) {
        return (
            <Box className="flex items-center justify-center h-screen bg-white">
                <Spinner />
            </Box>
        )
    }

    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader backTo="/" title={"Xem vé"} />
            <Tabs defaultActiveKey="1">
                <Tabs.Tab key={"1"} label="Hiện tại">
                    <Box className="flex-1 h-[82vh] items-center justify-center space-y-8 overflow-auto"
                        p={4}>
                        <TicketList isLoadingClick={isLoadingClick} onClick={handleRefresh} ticketFilter={currentTickets} />
                    </Box>
                </Tabs.Tab>
                <Tabs.Tab key={"2"} label="Đã đi">
                    <Box className="flex-1 h-[82vh] items-center justify-center space-y-8 overflow-auto"
                        p={4}>
                        <TicketList isLoadingClick={isLoadingClick} onClick={handleRefresh} ticketFilter={usedTickets} />
                    </Box>
                </Tabs.Tab>
                <Tabs.Tab key={"3"} label="Đã hủy">
                    <Box className="flex-1 h-[82vh] items-center justify-center space-y-8 overflow-auto"
                        p={4}>
                        <TicketList isLoadingClick={isLoadingClick} onClick={handleRefresh} ticketFilter={cancelledTickets} />
                    </Box>
                </Tabs.Tab>
            </Tabs>
        </Page >
    );
}





