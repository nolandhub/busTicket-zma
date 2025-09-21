import TabView from "@/components/AvailableTrip/ImageViewer";
import RouteIndicator from "@/components/AvailableTrip/RouteIndicatorIcon"
import BackHeader from "@/components/common/BackHeader";
import { Box, Page, Text } from "zmp-ui";

export default function AvailableTrip() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title="Danh sách chuyến xe" />

            {/* <TabView /> */}

            <Box className="flex-1 overflow-auto p-4">

                <Box className="bg-zinc-200 p-2">
                    <RouteIndicator defStart="New York" defEnd="Canada" />

                </Box>

            </Box>





        </Page >

    );

}



