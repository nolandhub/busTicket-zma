import TripList from "@/components/AvailableTrip/tripList";
import BackHeader from "@/components/common/BackHeader";
import ModalChange from "@/components/common/ModalChangedCore";
import { useState } from "react";
import { Box, Page } from "zmp-ui";

export default function AvailableTrip() {
    const [visible, setVisible] = useState<boolean>(false);

    return (

        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader onClickChange={() => setVisible(true)} />

            <Box className="flex-1 overflow-auto space-y-4 p-4 border-t-2 border-t-slate-300">
                <TripList />
                <TripList />
                <TripList />
                <TripList />
            </Box>
            <ModalChange visible={visible} onClose={() => setVisible(false)} />
        </Page >
    );
}




