import dayjs from "dayjs";
import { Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import { ShowTimeHH_MM_SS } from "@/helper/formatTime"
import { FlashSale } from "@/types/tripType";

const FlashSaleCard: FC<{ flashSale: FlashSale | null }> = ({ flashSale }) => {
    const [remainingTime, setRemainingTime] = useState<number>(0)

    if (flashSale) {
        useEffect(() => {
            const time = setInterval(() => {
                const now = dayjs()
                const end = dayjs(flashSale.endTime)
                const diff = end.diff(now, "seconds")

                if (diff >= 0) {
                    setRemainingTime(diff)
                } else {
                    setRemainingTime(0)
                    clearInterval(time)
                }
            }, 1000)
            return () => clearInterval(time)
        }, [])

        if (!flashSale?.isActive || remainingTime == 0) {
            return (<></>)
        }
        return (
            <Box className="flex items-center justify-between bg-white rounded-t-xl overflow-hidden">
                <div className="flex flex-1 items-center justify-center bg-green-500 border-r border-slate-300 py-1">
                    <Zap size={20} strokeWidth={4} fill="yellow" color="yellow" />
                    <Text bold className="text-white ml-1">Flash Sale</Text>
                </div>

                <div className="flex flex-1 items-center justify-center py-1">
                    <Text className="text-green-700 font-semibold text-sm">
                        Kết thúc sau <span className="text-red-500 text-md font-bold">{ShowTimeHH_MM_SS(remainingTime)}</span>
                    </Text>
                </div>
            </Box>
        )
    }

    return (<></>)
}

export default FlashSaleCard