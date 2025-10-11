import Info from "@/components/Booking/Info";
import OptionPrice from "@/components/Booking/OptionPrice";
import BackHeader from "@/components/common/BackHeader";
import { Divider } from "@/components/common/Divider";
import ModalChange from "@/components/common/ModalChangedCore";
import { selectedTripState } from "@/state";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Page, Text } from "zmp-ui";

export default function BookingPage() {
    const tripSelected = useRecoilValue(selectedTripState)
    const [openChanged, setOpenChanged] = useState(false);

    if (!tripSelected) {
        return (
            <>
                <BackHeader />
                <Text>
                    Chưa chọn chuyến nào, hãy quay lại để chọn chuyến.....
                </Text>
            </>
        )
    }

    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader onClickChange={() => setOpenChanged(true)} />
            <Box className="flex-1 overflow-auto ga">
                <Info />
                <Divider size={1} className="my-4" />
                <OptionPrice originPrice={tripSelected.price} flashSale={tripSelected.flashSale} />
            </Box>
            <ModalChange visible={openChanged} onClose={() => setOpenChanged(false)} />
        </Page >
    )
}





