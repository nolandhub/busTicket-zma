// components/DateRangeInfo.tsx
import { Box } from "zmp-ui";
import { getRangeDays } from "@/utils/date";

export default function DateRangeInfo({
    departDate,
    returnDate,
}: {
    departDate: Date;
    returnDate: Date;
}) {
    return (
        <Box className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-green-800 font-medium">
                Đã chọn khoảng thời gian:
            </div>
            <div className="text-green-600 text-sm mt-1">
                {getRangeDays(departDate, returnDate)} ngày
            </div>
        </Box>
    );
}
