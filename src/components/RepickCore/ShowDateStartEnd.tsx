// components/TripDates.tsx
import { Box } from "zmp-ui";
import { parseString } from "@/utils/date";

export default function TripDates({
    departDate,
    returnDate,
}: {
    departDate: Date;
    returnDate?: Date | null;
}) {
    return (
        <Box className="mb-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-around items-center">
                <div className="text-xl">
                    <span className="text-gray-500">Ngày đi:</span>
                    <div className="font-medium text-green-600">
                        {parseString(departDate)}
                    </div>
                </div>
                <div className="text-gray-400 text-4xl">→</div>
                <div className="text-xl">
                    <span className="text-gray-500">Ngày về:</span>
                    <div className="font-medium text-green-600">
                        {returnDate ? parseString(returnDate) : "Chưa chọn"}
                    </div>
                </div>
            </div>
        </Box>
    );
}
