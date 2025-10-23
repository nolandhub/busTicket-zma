import { Check, Clock4, LucideBusFront, QrCodeIcon, Users2Icon } from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { Divider } from "../common/Divider";
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon";
import { Ticket } from "@/types/bookingType";

interface Props {
    dataTicket?: Ticket

}

const TicketItem: FC<Props> = ({ dataTicket }) => {
    return (
        <Box className="bg-white rounded-lg border border-gray-400 shadow-md">
            <Box className="flex justify-between p-2 bg-blue-500 rounded-t-lg">
                <div className="flex space-x-2 items-center">
                    <LucideBusFront className="text-slate-50" size={25} strokeWidth={2} />
                    <Text className="font-bold text-yellow-200">Wed,Feb 21,2024</Text>
                    <div className="flex items-center justify-center gap-1">
                        <Users2Icon strokeWidth={3} size={18} className="text-slate-50" />
                        <Text className="text-slate-50 text-lg" bold>1</Text>
                    </div>
                </div>
                <Text className="cursor-pointer text-white font-bold underline underline-offset-2">Chi tiết vé</Text>
            </Box>

            <Box className="flex-1 p-1 rounded-lg">

                <Box className="flex space-x-1 ml-2 items-center">
                    <Clock4 size={18} className="text-blue-600" strokeWidth={3} />
                    <Text bold className="text-stone-500">Thời gian xe xuất bến: </Text>
                    <Text className="text-start text-lg font-medium"> 12:00 </Text>
                </Box>
                <Divider size={1} className="my-1" />

                <Box className="p-2 flex justify-between">
                    <Box className="flex flex-col">
                        <Text className="font-bold text-xl">Cúc Tùng Limousine</Text>
                        <Text className="text-stone-600"> Giường nằm 43 chỗ</Text>
                    </Box>
                    <Box className="flex flex-col">
                        <Text className="text-center font-semibold text-gray-500">Biển số</Text>
                        <Box className="border-2 rounded-lg border-black p-1 flex items-center justify-center">
                            <Text bold>50F-013.14</Text>
                        </Box>
                    </Box>
                </Box>

                <Box></Box>
                <Divider className="mt-2" size={1} />

                <Box className="p-2 flex justify-between gap-2">
                    <RouteIndicator
                        startLocation={"Hồ Chí Minh"}
                        subStartLocation={"Văn phòng quận 5"}
                        endLocation={"Đà Lạt"}
                        subEndLocation={"Văn phòng đà lạt"}
                    />
                    <div
                        className="w-40 h-30 rounded-lg bg-[url(https://tse1.mm.bing.net/th/id/OIP.iniUgo7vD_h5TWMwmerocwHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3)] bg-cover bg-center"
                    />
                </Box>

                <Box onClick={() => console.log("hello")} className="flex my-1 mx-2 cursor-pointer border border-slate-300 gap-2 items-center justify-center flex-1 rounded-md py-2 hover:bg-slate-200">
                    <QrCodeIcon strokeWidth={2} />
                    <Text className="font-bold">Xem QR code</Text>
                </Box>
            </Box>

            <footer className="p-2 rounded-b-lg bg-green-100 flex justify-between items-center">
                <Box className="flex gap-2 items-center">
                    <Box className="bg-green-600 w-fit rounded-full">
                        <Check className="text-white" />
                    </Box>
                    <Text size="xxSmall">Confirmed by bus operator</Text>
                </Box>

                <Box className="flex gap-1">
                    <Text size="xxSmall">
                        Ticket code:
                    </Text>
                    <Text size="xxSmall" className="text-center">PRB2983A</Text>
                </Box>
            </footer>

        </Box >

    )



}

export default TicketItem