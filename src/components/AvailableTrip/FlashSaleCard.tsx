import dayjs from "dayjs";
import { Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import { splitDD_HH_MM_SS } from "@/helper/splitDD_HH_MM_SS";
import { FlashSale } from "@/types/tripType";
import { useRecoilValue } from "recoil";
import { departureDateState } from "@/state";

const FlashSaleCard: FC<{ flashSale: FlashSale | null }> = ({ flashSale }) => {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const departDate = useRecoilValue(departureDateState);

    useEffect(() => {
        if (!flashSale) return;
        const timer = setInterval(() => {
            const now = dayjs();
            const end = dayjs(flashSale.endTime);
            const depart = dayjs(departDate);

            // Chỉ lấy phần ngày, bỏ qua giờ
            const daysDiff = depart.startOf('day').diff(now.startOf('day'), 'days');
            const offset = daysDiff * 24 * 60 * 60; // Chuyển sang giây

            // Trừ offset vào end (nếu offset âm thì end sẽ tăng lên)
            const adjustedEnd = end.subtract(offset, "seconds");

            const diff = adjustedEnd.diff(now, "seconds");

            if (diff >= 0) {
                setRemainingTime(diff);
            } else {
                setRemainingTime(0);
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [flashSale, departDate]);


    if (!flashSale?.isActive || remainingTime <= 0) {
        return null;
    }

    return (
        <Box className="flex items-center justify-between bg-white rounded-t-xl overflow-hidden">
            <div className="flex flex-1 items-center justify-center bg-green-500 border-r border-slate-300 py-1">
                <Zap size={20} strokeWidth={4} fill="yellow" color="yellow" />
                <Text bold className="text-white ml-1 whitespace-nowrap">Flash Sale</Text>
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
