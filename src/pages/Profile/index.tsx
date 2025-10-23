import { Box, Page } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import { Divider } from "@/components/common/Divider";
import UserCard from "@/components/common/UserCard";
import UserInfoSection from "@/components/Profile/UserInfoSection";


export default function Profile() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title={"Thông tin cá nhân"} />
            <Box className="flex-1 overflow-auto mt-1 p-2">
                <UserCard />
                <UserInfoSection />


            </Box>

        </Page >
    );
}





