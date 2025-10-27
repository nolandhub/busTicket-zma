import {
    Clock4, LucideBusFront,
    QrCodeIcon, Users2Icon,
    Check, CheckCircle, Clock, XCircle
} from "lucide-react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { Divider } from "../common/Divider";
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon";
import { Ticket, TicketStatus } from "@/types/bookingType";
import dayjs from "dayjs";
import { Modal } from "zmp-ui";
import useTicket from "@/hooks/useTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useRecoilValue } from "recoil";
import { busCompanyState } from "@/state";

interface Props {
    dataTicket: Ticket
    onCick: (data: Ticket) => void
}
const TicketItem: FC<Props> = ({ dataTicket, onCick }) => {

    const statusConfig: Record<TicketStatus, {
        icon: FC<any>;
        bgColor: string;
        iconBgColor: string;
        text: string;
    }> = {
        pending: {
            icon: Clock,
            bgColor: "bg-yellow-100",
            iconBgColor: "bg-yellow-600",
            text: "Chờ xác nhận"
        },
        confirmed: {
            icon: Check,
            bgColor: "bg-green-100",
            iconBgColor: "bg-green-600",
            text: "Đã xác nhận"
        },
        used: {
            icon: CheckCircle,
            bgColor: "bg-blue-100",
            iconBgColor: "bg-blue-600",
            text: "Đã sử dụng"
        },
        cancelled: {
            icon: XCircle,
            bgColor: "bg-red-100",
            iconBgColor: "bg-red-600",
            text: "Đã hủy"
        }
    };
    const {
        visible,
        setVisible
    } = useTicket()
    const busCompData = useRecoilValue(busCompanyState)
    const busCompFilter = busCompData.find(f => f.compId === dataTicket?.compId);
    const currentStatus = dataTicket?.status || "pending";
    const statusInfo = statusConfig[currentStatus]
    const StatusIcon = statusInfo.icon
    if (!dataTicket) return null

    return (
        <Box className="bg-white rounded-lg border border-gray-400 shadow-md">
            <Box className="flex justify-between p-2 bg-blue-500 rounded-t-lg">
                <div className="flex space-x-2 items-center">
                    <LucideBusFront className="text-slate-50" size={25} strokeWidth={2} />
                    <Text className="font-bold text-yellow-200">
                        {dataTicket?.bookingDate
                            ? (dayjs(dataTicket.bookingDate)).format("dddd, DD/MM/YYYY")
                            : "Chưa cập nhật"}
                    </Text>
                    <div className="flex items-center justify-center gap-1">
                        <Users2Icon strokeWidth={3} size={18} className="text-slate-50" />
                        <Text className="text-slate-50 text-lg" bold>{dataTicket?.totalPassCount || "-"}</Text>
                    </div>
                </div>
                <Text onClick={() => onCick(dataTicket)} className="cursor-pointer text-white font-bold underline underline-offset-2">Chi tiết vé</Text>
            </Box>

            <Box className="flex-1 p-1 rounded-lg">
                <Box className="flex space-x-1 ml-2 items-center">
                    <Clock4 size={18} className="text-blue-600" strokeWidth={3} />
                    <Text bold className="text-stone-500">Thời gian xe xuất bến: </Text>
                    <Text className="text-start text-lg font-medium">{dataTicket.option[0].time || "-- : --"} </Text>
                </Box>

                <Divider size={1} className="my-1" />

                <Box className="px-2 py-1">
                    <Text className="font-bold text-2xl text-blue-800">
                        {dataTicket.routeName}
                    </Text>
                </Box>

                <Box className="px-2 flex justify-between">
                    <Box className="flex flex-col">
                        <Text className="font-semibold text-slate-800 text-lg">{dataTicket?.compName || "Bus Default"}</Text>
                        <Text className="text-slate-500"> {dataTicket?.busName || "Bus Default"}</Text>
                    </Box>
                    <Box className="flex flex-col ">
                        <Text className="text-center font-semibold text-gray-500">Biển số</Text>
                        <Box className="border-2 rounded-lg border-black p-1 flex items-center justify-center">
                            {dataTicket?.busNumber
                                ? <Text bold>{dataTicket?.busNumber}</Text>
                                : <Text bold className="text-red-600 p-1">Chưa cập nhật</Text>
                            }
                        </Box>
                    </Box>
                </Box>

                <Divider className="mt-2" size={1} />

                <Box className="p-2 flex justify-between gap-2">
                    <RouteIndicator
                        startLocation={dataTicket?.pickUp?.title || "Chưa cập nhật"}
                        subStartLocation={dataTicket?.pickUp?.subTitle || "Chưa cập nhật"}
                        endLocation={dataTicket?.dropOff?.title || "Chưa cập nhật"}
                        subEndLocation={dataTicket?.dropOff?.subTitle || "Chưa cập nhật"}
                    />
                    <div
                        className={`w-40 h-30 rounded-lg ${busCompFilter?.id ? `bg-[url(${busCompFilter.avatar})]` : "bg-[url(https://i.pinimg.com/736x/17/b7/6c/17b76c78de979b6cf2600a8e957403a7.jpg)]"} bg-cover bg-center`}
                    />
                </Box>

                <Box onClick={() => setVisible(true)} className="flex my-1 mx-2 cursor-pointer border border-slate-300 gap-2 items-center justify-center flex-1 rounded-md py-2 hover:bg-slate-200">
                    <QrCodeIcon strokeWidth={2} />
                    <Text className="font-bold">Xem QR code</Text>
                </Box>
            </Box>

            <footer className={`p-2 rounded-b-lg ${statusInfo.bgColor} flex justify-between items-center`}>
                <Box className="flex gap-2 items-center">
                    <Box className={`${statusInfo.iconBgColor} w-fit rounded-full p-1`}>
                        <StatusIcon className="text-white" size={16} />
                    </Box>
                    <Text bold size="xxSmall">{statusInfo.text}</Text>
                </Box>

                <Box className="flex gap-1">
                    <Text size="xxSmall">
                        Ticket code:
                    </Text>
                    <Text bold size="xxSmall" className="text-center">{dataTicket?.id || "Chưa cập nhật"}</Text>
                </Box>
            </footer>
            {
                true && <Modal
                    actions={[
                        {
                            close: true,
                            highLight: true,
                            text: 'Đóng'
                        }
                    ]}
                    onClose={() => setVisible(false)}
                    visible={visible}
                >
                    <Box className="flex justify-center my-4">
                        <QRCodeCanvas
                            value="Tính năng đang được phát triển."
                            size={220}
                            level="M"
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                    </Box>
                </Modal>
            }
        </Box >
    )
}

export default TicketItem