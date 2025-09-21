import TripCard from "@/components/AvailableTrip/TripCard";
import { TripItem } from "@/components/AvailableTrip/TripItem";
import BackHeader from "@/components/common/BackHeader";
import { Box, Page } from "zmp-ui";

export default function AvailableTrip() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title="Danh sách chuyến xe" />
            {/* <TabView /> */}

            <Box className="flex-1 overflow-auto p-2 space-y-4 ">
                <TripCard />


                <TripItem />

            </Box>



        </Page >

    );

}



