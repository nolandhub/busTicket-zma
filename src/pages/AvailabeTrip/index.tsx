import { TripItem } from "@/components/AvailableTrip/TripItem";
import BackHeader from "@/components/common/BackHeader";
import SearchArea from "@/components/Home/SearchArea";
import { useState } from "react";
import { Box, Text, Page, useLocation, Modal } from "zmp-ui";

export default function AvailableTrip() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get('from') || '';
    const to = params.get('to') || '';
    const date = params.get('date') || '';
    const fromLabel = params.get('fromLabel') || '';
    const toLabel = params.get('toLabel') || '';

    const [open, setOpen] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(true)
    }

    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader
                title={
                    <Box className="flex justify-between">
                        <div className="flex flex-col">
                            <Text.Title  >{fromLabel} - {toLabel}</Text.Title>
                            <Text bold size="xLarge" className=" text-gray-600">{date}</Text>
                        </div>

                        <Text onClick={handleClick} className="mt-8 underline underline-offset-2">
                            Thay đổi
                        </Text>
                    </Box>
                }
            />

            {
                open && <>
                    <Modal
                        actions={[
                            {
                                close: true,
                                highLight: true,
                                text: 'Đóng'
                            }
                        ]}
                        onClose={() => setOpen(false)}
                        visible={open}
                    >
                        <SearchArea />
                    </Modal>
                </>
            }

            <Box className="flex-1 overflow-auto space-y-4 p-4  border-t-2 border-t-slate-300">
                <TripItem />
                <TripItem />

            </Box>
        </Page >

    );

}




