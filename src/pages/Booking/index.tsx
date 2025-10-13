import BookingStep from "@/components/Booking/BookingPageStep";
import InfoOption from "@/components/Booking/InfoOption";
import BackHeader from "@/components/common/BackHeader";
import { Divider } from "@/components/common/Divider";
import ModalChange from "@/components/common/ModalChangedCore";
import { selectedTripState } from "@/state";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Page } from "zmp-ui";

export default function BookingPage() {

    const [openChanged, setOpenChanged] = useState(false);

    return (
        <Page className="flex-1 flex flex-col bg-slate-200 ">
            <BackHeader onClickChange={() => setOpenChanged(true)} />
            <Box className="flex-1 overflow-auto p-4">
                <BookingStep />
            </Box>

            <ModalChange visible={openChanged} onClose={() => setOpenChanged(false)} />
        </Page >
    )
}





