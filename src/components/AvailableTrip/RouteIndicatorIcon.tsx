import { MapPinCheckIcon, Locate } from "lucide-react";
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
        <Box className="flex w-fit">
            {/* Cột giờ */}
            <Box className="flex flex-col justify-between ">
                <Text className="text-black font-bold text-md" >
                    {startTime}
                </Text>
                <Text className="text-end text-gray-400 text-[10px] font-extralight">
                    {duration}
                </Text>
                <Text className="text-center text-gray-500 text-md font-bold" >
                    {endTime}
                </Text>
            </Box>

            {/* Cột icon + line */}
            <Box className="flex flex-col justify-end items-center mx-2">
                <Locate size={12} strokeWidth={4} className="text-red-600" />
                <div className="h-8 w-px bg-gray-400" />
                <MapPinCheckIcon size={12} strokeWidth={4} className="text-blue-400" />
            </Box>

            {/* Cột text */}
            <Box className="flex flex-col justify-between">
                <Text className="text-xs font-semibold">{startLocation}</Text>
                <Text className="text-xs font-semibold text-gray-400" >
                    {endLocation}
                </Text>
            </Box>
        </Box>

    );
};

export default RouteIndicator;
