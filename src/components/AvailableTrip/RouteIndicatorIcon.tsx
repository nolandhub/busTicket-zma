import { Locate, MapPinIcon } from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { Divider } from "../common/Divider";

interface RouteIndicatorProps {
    startLocation?: string
    subStartLocation?: string
    endLocation?: string
    subEndLocation?: string
    startTime?: string
    duration?: string
    endTime?: string
    onClick?: () => void
}

const RouteIndicator: FC<RouteIndicatorProps> = ({ startLocation, subStartLocation, endLocation, subEndLocation, startTime, duration, endTime, onClick }) => {

    return (
        <Box onClick={onClick} className="flex gap-1 cursor-pointer">
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
                    <MapPinIcon size={16} strokeWidth={3} className="text-blue-500" />
                    <div className="h-14 w-px bg-slate-500" />
                    <Locate size={16} strokeWidth={4} className="text-red-400" />
                </div>
            </Box>

            {/* Cột text */}
            <Box className="flex-1 ml-1 flex flex-col space-y-6">
                <Box className="flex flex-1 flex-col">
                    <Text className="font-bold">{startLocation}</Text>
                    <Text className="text-xs text-indigo-600 underline underline-offset-2 ">{subStartLocation}</Text>
                </Box>

                <Box className="flex flex-1 flex-col ">
                    <Text className=" font-bold text-gray-500" >
                        {endLocation}
                    </Text>
                    <Text className="text-xs text-indigo-600 underline underline-offset-2" >
                        {subEndLocation}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default RouteIndicator;
