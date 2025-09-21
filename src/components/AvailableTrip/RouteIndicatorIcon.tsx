// import { MapPinCheckIcon, Locate } from "lucide-react";
// import { FC } from "react";
// import { Box, Text } from "zmp-ui";



// const RouteIndicator: FC<{ defStart: string, defEnd: string }> = ({ defStart, defEnd }) => {
//     return (
//         <Box className="w-fit">
//             <Box className="grid grid-flow-col grid-rows-3 items-center justify-center">
//                 <div className="row-span-3">
//                     <Locate size={22} strokeWidth={3} className="text-red-500" />
//                     <div className="w-px h-10 bg-gray-400 mx-auto"></div>
//                     <MapPinCheckIcon size={22} strokeWidth={3} className="text-blue-300" />
//                 </div>
//                 <div className="col-span-2 pl-1 max-w-md text-"><Text bold size="small">{defStart}b</Text></div>
//                 <><br /></>
//                 <div className="col-span-2 pl-1 text-start"><Text bold size="small">{defEnd}a</Text> </div>
//             </Box >
//         </Box >

//     );
// };
// export default RouteIndicator;

import { MapPinCheckIcon, Locate } from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";

interface RouteIndicatorProps {
    defStart: string;
    defEnd: string;
}

const RouteIndicator: FC<RouteIndicatorProps> = ({ defStart, defEnd }) => {
    return (
        <Box className="w-fit flex">
            {/* Cột icon + line */}
            <Box className="flex flex-col items-center">
                <Locate size={22} strokeWidth={3} className="text-red-500" />
                <div className="w-px h-8 bg-gray-400 " />
                <MapPinCheckIcon size={22} strokeWidth={3} className="text-blue-300" />
            </Box>

            {/* Cột text */}
            <Box className="flex flex-col justify-between ml-2">
                <Text bold size="small">{defStart}</Text>
                <Text bold size="small">{defEnd}</Text>
            </Box>
        </Box>
    );
};

export default RouteIndicator;
