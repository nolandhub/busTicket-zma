// components/Ticket/TicketPageContent.tsx
import { Box, Spinner } from "zmp-ui";
import { Tabs } from "zmp-ui";
import TicketList from "@/components/Ticket/TicketList";
import useTicket from "@/hooks/useTicket";
import { useSubcribeTicket } from "@/firebase/firestore/ticketCrud";
import DetailTicket from "@/components/Ticket/DetailTicket";

const TAB_CONFIG = [
    { key: "1", label: "Hiện tại", dataKey: "currentTickets" },
    { key: "2", label: "Đã đi", dataKey: "usedTickets" },
    { key: "3", label: "Đã hủy", dataKey: "cancelledTickets" }
];

export default function TicketPageContent() {
    const {
        loadingCancel,
        currentTickets,
        usedTickets,
        cancelledTickets,
        loadingRefresh,
        handleRefresh,
        ticketSelected,
        setTicketSelected,
        isCancel,
        handleChange,
        handleCancel
    } = useTicket();

    const { loadingTicket } = useSubcribeTicket();
    const ticketData = { currentTickets, usedTickets, cancelledTickets };

    if (loadingTicket) {
        return (
            <Box className="flex items-center justify-center h-screen bg-white">
                <Spinner />
            </Box>
        );
    }

    return (
        <>
            <Tabs defaultActiveKey="1">
                {TAB_CONFIG.map(({ key, label, dataKey }) => (
                    <Tabs.Tab key={key} label={label}>
                        <Box
                            className="flex-1 h-[82vh] pb-20 items-center justify-center space-y-8 overflow-auto"
                            p={4}
                        >
                            <TicketList
                                handleSetTicket={setTicketSelected}
                                isLoadingClick={loadingRefresh}
                                onClick={handleRefresh}
                                ticketFilter={ticketData[dataKey]}
                            />
                        </Box>
                    </Tabs.Tab>
                ))}
            </Tabs>

            {ticketSelected && (
                <DetailTicket
                    loadingCancel={loadingCancel}
                    ticketSelected={ticketSelected}
                    onCancel={handleCancel}
                    onChange={handleChange}
                    onClose={() => setTicketSelected(null)}
                    isCancel={isCancel}
                />
            )}
        </>
    );
}