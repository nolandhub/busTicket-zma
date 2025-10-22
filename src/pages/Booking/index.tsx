import BookingStep from "@/components/Booking/BookingPageStep";
import BackHeader from "@/components/common/BackHeader";
import ModalChange from "@/components/common/ModalChangedCore";
import { useState } from "react";
import { Box, Page } from "zmp-ui";

export default function BookingPage() {
    const [openChanged, setOpenChanged] = useState(false);

    return (
        <Page className="flex-1 flex flex-col bg-slate-100 ">
            <BackHeader onClickChange={() => setOpenChanged(true)} />
            <Box className="flex-1 overflow-auto ">
                <BookingStep />
            </Box>

            <ModalChange visible={openChanged} onClose={() => setOpenChanged(false)} />
        </Page >

    )
}





