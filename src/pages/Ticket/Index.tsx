import { Page } from "zmp-ui";
import BackHeader from "@/components/common/BackHeader";
import TicketContent from "@/components/Ticket/TicketContent";

export default function TicketPage() {
    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader backTo="/" title="Xem vé" />
            <TicketContent />
        </Page>
    );
}