import dayjs from "dayjs";
import { Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import { splitDD_HH_MM_SS } from "@/helper/splitDD_HH_MM_SS";
import { useRecoilValue } from "recoil";
import { departureDateState } from "@/state";
import { SaleDetail } from "@/types/tripType";

const FlashSaleCard: FC<{ snapShotSale?: SaleDetail | null }> = ({ snapShotSale }) => {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const departDate = useRecoilValue(departureDateState);

    useEffect(() => {
        if (!snapShotSale?.isActive) {
            setRemainingTime(0);
            return;
        }

        const calculateRemainingTime = () => {
            const now = dayjs();
            const start = dayjs(snapShotSale.startDate);
            const end = dayjs(snapShotSale.endDate); // Sửa lỗi: dùng endDate thay vì startDate
            const depart = dayjs(departDate);

            //checkRange
            const isDepartInRange = !depart.isBefore(start) && !depart.isAfter(end);

            if (!isDepartInRange) {
                setRemainingTime(0);
                return false;
            }

            // cal offSet
            const daysDiff = depart.startOf('day').diff(now.startOf('day'), 'days');
            const offsetSeconds = daysDiff * 24 * 60 * 60;

            // adjust End
            const adjustedEnd = end.subtract(offsetSeconds, "seconds");
            const diff = adjustedEnd.diff(now, "seconds");

            if (diff > 0) {
                setRemainingTime(diff);
                return true;
            } else {
                setRemainingTime(0);
                return false;
            }
        };

        const shouldContinue = calculateRemainingTime();
        if (!shouldContinue) return;

        const timer = setInterval(() => {
            const shouldContinue = calculateRemainingTime();
            if (!shouldContinue) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [snapShotSale, departDate]);


    if (!snapShotSale?.isActive || remainingTime <= 0) {
        return null;
    }

    return (
        <Box className="flex items-center justify-between bg-white rounded-t-xl overflow-hidden">
            <div className="flex flex-1 items-center justify-center bg-green-500 border-r border-slate-300 py-1">
                <Zap size={20} strokeWidth={4} fill="yellow" color="yellow" />
                <Text bold className="text-white ml-1 whitespace-nowrap">
                    {snapShotSale.label}
                </Text>
            </div>

            <div className="flex flex-1 items-center justify-center py-1 px-2">
                <Text className="text-green-700 font-semibold text-[13px] text-center whitespace-nowrap truncate">
                    Thời gian:{" "}
                    <span className="text-red-500 text-md font-bold ml-1">
                        {splitDD_HH_MM_SS(remainingTime)}
                    </span>
                </Text>
            </div>
        </Box>
    );
};

export default FlashSaleCard;