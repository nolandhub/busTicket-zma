import { Locate, MapPinIcon } from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";

interface RouteIndicatorProps {
    startLocation: string
    endLocation: string
    startTime: string
    duration: string
    endTime: string
}

const RouteIndicator: FC<RouteIndicatorProps> = ({ startLocation, endLocation, startTime, duration, endTime }) => {
    return (
        <Box className="flex gap-1">
            {/* Cột giờ */}
            <Box className="flex flex-col justify-between">
                <Text className="text-black font-bold text-md" >
                    {startTime}
                </Text>
                <Text className="text-end text-gray-500 text-[10px] font-extralight">
                    {duration}
                </Text>
                <Text className="text-center text-gray-500 text-md font-bold" >
                    {endTime}
                </Text>
            </Box>

            {/* Cột icon + line */}
            <Box className="flex items-center">
                <div className="flex flex-col items-center">
                    <MapPinIcon size={12} strokeWidth={3} className="text-blue-500" />
                    <div className="h-10 w-px bg-slate-500" />
                    <Locate size={12} strokeWidth={4} className="text-red-400" />
                </div>
            </Box>

            {/* Cột text */}
            <Box className="flex-1 flex flex-col justify-between">
                <Text className="text-xs font-semibold">{startLocation}</Text>
                <Text className="text-xs font-semibold text-gray-500" >
                    {endLocation}
                </Text>
            </Box>
        </Box>
    );
};

export default RouteIndicator;
