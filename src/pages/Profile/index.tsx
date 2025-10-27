import { Page } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import ProfileContent from "@/components/Profile/ProfileContent";

export default function Profile() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title={"Thông tin cá nhân"} />
            <ProfileContent />
        </Page >
    );
}





