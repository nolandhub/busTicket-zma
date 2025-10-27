// components/Notification/SaleNotification.tsx
import { Box, Text } from "zmp-ui";
import { Bell } from "lucide-react";

export default function SaleNotification() {
    return (
        <Box className="flex flex-col items-center justify-center space-y-4 p-6">
            <Box className="w-20 h-20 rounded-full flex items-center justify-center">
                <Bell size={40} className="text-blue-500" />
            </Box>
            <Box className="text-center space-y-2">
                <Text className="text-gray-800 font-medium text-base">
                    Chưa có khuyến mãi nào
                </Text>
                <Text className="text-gray-500 text-sm px-4">
                    Bạn sẽ nhận được thông báo khi có các chương trình khuyến mãi và ưu đãi đặc biệt
                </Text>
            </Box>
            <strong className="">(Tính năng đang phát triển)</strong>
        </Box>
    );
}