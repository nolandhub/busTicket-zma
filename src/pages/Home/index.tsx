import { Box, Page } from "zmp-ui";
import { Welcome } from "@/components/Home/Welcome";
import UserHero from "@/components/Home/UserHero";
import SearchArea from "@/components/Home/SearchArea";
import { Divider } from "@/components/common/Divider";
import RouteSwiper from "@/components/Home/RoutesSwiper";

export default function HomePage() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <Welcome />
            <Box className="flex-1 overflow-auto pb-20 p-1">
                <UserHero />
                <SearchArea />
                <Divider />
                <RouteSwiper />
                <Divider />

            </Box>
        </Page >
    );
}





