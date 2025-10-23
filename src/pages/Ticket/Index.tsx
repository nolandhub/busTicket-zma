import { Box, Page } from "zmp-ui";
import { Tabs } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import TicketItem from "@/components/Ticket/TicketItem";


export default function Ticket() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title={"Xem vé"} />
            <Box className="flex-1 overflow-auto">
                <Tabs defaultActiveKey="1" >
                    <Tabs.Tab key={"1"} label="Hiện tại">
                        <Box className="space-y-6 pb-20" p={4}>
                            <TicketItem />
                            <TicketItem />

                        </Box>
                    </Tabs.Tab>
                    <Tabs.Tab key={"2"} label="Đã đi">
                        <Box p={4}>

                        </Box>
                    </Tabs.Tab>
                    <Tabs.Tab key={"3"} label="Đã hủy">
                        <Box p={4}>

                        </Box>
                    </Tabs.Tab>
                </Tabs>

            </Box>
        </Page >
    );
}





