import { Zap } from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";


const FlashSaleCard: FC<{ isActive: boolean }> = ({ isActive }) => {
    if (!isActive) {
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
                    Kết thúc sau <span className="text-red-500 text-md font-bold">12:15:20</span>
                </Text>
            </div>
        </Box>
    )
}

export default FlashSaleCard