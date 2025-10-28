// components/Notification/NotificationPageContent.tsx
import { Box } from "zmp-ui";
import { Tabs } from "zmp-ui";
import SaleNotification from "./SaleItemNotification";
import TripItemNotification from "./TripItemNotification";
const TAB_CONFIG = [
    { key: "1", label: "Chuyến đi", component: TripItemNotification },
    { key: "2", label: "Khuyến mãi", component: SaleNotification }
];

export default function NotificationPageContent() {
    return (
        <Tabs defaultActiveKey="1">
            {TAB_CONFIG.map(({ key, label, component: Component }) => (
                <Tabs.Tab key={key} label={label}>
                    <Box
                        className="flex-1 h-[84vh] flex items-center justify-center"
                        p={4}
                    >
                        <Component />
                    </Box>
                </Tabs.Tab>
            ))}
        </Tabs>
    );
}