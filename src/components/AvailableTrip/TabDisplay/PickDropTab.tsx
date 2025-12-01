import { BasePickDrop } from "@/types/tripType";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { MapPin, LocateFixed } from "lucide-react";

interface Props {
    hasTransfer: number | null
    pickUp: BasePickDrop[];
    dropOff: BasePickDrop[];
}

// const PickDropTab: FC<Props> = ({ pickUp, dropOff, hasTransfer }) => {
//     return (
//         <Box className="space-y-6 border">
//             {/* Điểm đón */}
//             {pickUp.length > 0 && (
//                 <div>
//                     <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center gap-2 ">
//                         <MapPin className="w-5 h-5 text-white" />
//                         <Text className="text-white font-semibold">Điểm đón</Text>
//                     </div>
//                     <div className="bg-white rounded-b-lg p-3 space-y-2">
//                         {pickUp.map((item, index) => (
//                             <div key={index} className="bg-green-50 rounded-lg p-3 border">
//                                 <div className="flex items-start justify-between gap-3">
//                                     <div className="flex-1">
//                                         <Text className="font-semibold text-gray-800 mb-1">
//                                             {item.title}
//                                         </Text>
//                                         <Text className="text-sm text-gray-600">
//                                             {item.subtitle}
//                                         </Text>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Điểm trả */}
//             {dropOff.length > 0 && (
//                 <div>
//                     <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center gap-2">
//                         <LocateFixed className="w-5 h-5 text-white" />
//                         <Text className="text-white font-semibold">Điểm trả</Text>
//                     </div>
//                     <div className="bg-white rounded-b-lg p-3 space-y-2">
//                         {dropOff.map((item, index) => (
//                             <div key={index} className="bg-green-50 rounded-lg p-3 border">
//                                 <div className="flex items-start justify-between gap-3">
//                                     <div className="flex-1">
//                                         <Text className="font-semibold text-gray-800 mb-1">
//                                             {item.title}
//                                         </Text>
//                                         <Text className="text-sm text-gray-600">
//                                             {item.subtitle}
//                                         </Text>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </Box>
//     );
// };




const PickDropTab: FC<Props> = ({ pickUp, dropOff, hasTransfer }) => {
    // Tạo mảng mới cho render
    const pickUpList =
        hasTransfer === 1 || hasTransfer === 3
            ? [...pickUp, { title: 'Trung Chuyển Tận Nơi', subtitle: '' }]
            : pickUp;

    const dropOffList =
        hasTransfer === 2 || hasTransfer === 3
            ? [...dropOff, { title: 'Trung Chuyển Tận Nơi', subtitle: '' }]
            : dropOff;

    return (
        <Box className="space-y-6 border">
            {/* Điểm đón */}
            {pickUpList.length > 0 && (
                <div>
                    <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center gap-2 ">
                        <MapPin className="w-5 h-5 text-white" />
                        <Text className="text-white font-semibold">Điểm đón</Text>
                    </div>
                    <div className="bg-white rounded-b-lg p-3 space-y-2">
                        {pickUpList.map((item, index) => (
                            <div key={index} className="bg-green-50 rounded-lg p-3 border">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <Text className="font-semibold text-gray-800 mb-1">
                                            {item.title}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {item.subtitle}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Điểm trả */}
            {dropOffList.length > 0 && (
                <div>
                    <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center gap-2">
                        <LocateFixed className="w-5 h-5 text-white" />
                        <Text className="text-white font-semibold">Điểm trả</Text>
                    </div>
                    <div className="bg-white rounded-b-lg p-3 space-y-2">
                        {dropOffList.map((item, index) => (
                            <div key={index} className="bg-green-50 rounded-lg p-3 border">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <Text className="font-semibold text-gray-800 mb-1">
                                            {item.title}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {item.subtitle}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Box>
    );
};


export default PickDropTab;