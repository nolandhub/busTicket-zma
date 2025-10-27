import { Box, Page } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import NotificationPageContent from "@/components/Notify/NotifyContent";

export default function Notify() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader title={"Thông báo"} />
            <NotificationPageContent />
        </Page >
    );
}





