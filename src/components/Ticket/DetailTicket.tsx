import { formatPrice } from "@/helper/formatPrice"
import { Ticket } from "@/types/bookingType"
import { formatDateVN } from "@/utils/date"
import { Clock } from "lucide-react"
import { FC } from "react"
import { Box, Button, Input, Modal, Text } from "zmp-ui"
import { InfoSection } from "../Profile/UserInfo"
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon"
import { Divider } from "../common/Divider"

interface Props {
    loadingCancel: boolean
    ticketSelected: Ticket
    onClose?: () => void
    onCancel: () => void
    isCancel?: boolean
    onChange?: (val: string) => void
}

const DetailTicket: FC<Props> = ({ onClose, ticketSelected,
    onChange, isCancel, onCancel, loadingCancel }) => {
    return (
        <Modal
            actions={[
                {
                    close: true,
                    text: 'Đóng'
                },

            ]}
            onClose={onClose}
            title="Chi tiết thông tin"
            visible
        >
            <Box className="flex-1 space-y-2 bg-slate-100 p-4 rounded-t-lg ">
                <Box className="flex justify-between">
                    <Text bold>{formatDateVN(ticketSelected.bookingDate)}</Text>
                    <div className="flex justify-center items-center gap-2">
                        <Clock className="text-blue-600" size={18} />
                        <Text bold>{ticketSelected.option[0].time}</Text>
                    </div>
                </Box>

                <Text size="xLarge" className="text-center font-bold">{ticketSelected.routeName}</Text>

                <Box className="flex flex-col gap-4">
                    <div className="flex flex-col ml-1 gap-2">
                        <Text>{ticketSelected.compName}</Text>
                        <Text className="text-start font-medium text-slate-500">{ticketSelected.busName}</Text>

                    </div>
                    <RouteIndicator
                        startLocation={ticketSelected.pickUp?.title}
                        endLocation={ticketSelected.dropOff?.title}
                        size={8}
                    />
                </Box>

                <Divider size={1} />

                <Box className="flex flex-col gap-2">
                    <Text.Title>Thông tin hành khách</Text.Title>
                    <Box className="flex flex-col gap-2">
                        <InfoSection hideDivider={true} label="Người đặt:" value={ticketSelected.bookingName} />
                        <InfoSection hideDivider={true} label="Điện thoại:" value={ticketSelected.bookingPhone} />
                        <InfoSection hideDivider={true} label="Số lượng:" value={String(ticketSelected.totalPassCount)} />
                    </Box>
                    <Text.Title>Thông tin chuyến</Text.Title>
                    <Box className="flex flex-col gap-2">
                        <InfoSection empty={ticketSelected.seatName == ""} hideDivider={true} label="Ghế:" value={ticketSelected.seatName != "" ? ticketSelected.seatName : "Chưa cập nhật"} />
                        <InfoSection empty={ticketSelected.busNumber == ""} hideDivider={true} label="Biển số:" value={ticketSelected.busNumber != "" ? ticketSelected.busName : "Chưa cập nhật"} />
                    </Box>

                    <Text.Title>Chi tiết vé</Text.Title>
                    {ticketSelected.option.map((opt, index) => (
                        <Box key={index} className="bg-gradient-to-r from-green-50 to-green-20 rounded-lg border">
                            <Box className="flex justify-between">
                                <Box className="flex-1 p-2">
                                    <Box className="font-bold text-gray-800">{opt.label}</Box>
                                    <Box className="text-md text-gray-600 mt-1">
                                        {formatPrice(opt.value)}đ × {opt.quantity} vé
                                    </Box>
                                </Box>
                                <Box className="text-right p-2">
                                    <Box className="text-xs text-gray-500">Thành tiền</Box>
                                    <Box className="font-bold text-lg text-emerald-600">
                                        {formatPrice(opt.subtotal)}đ
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
            <Divider size={2} />

            <Box className="p-3 flex justify-between items-center bg-blue-50 rounded-b-lg shadow-sm ">
                <Text className="text-sm font-semibold text-blue-600 tracking-wide">
                    TỔNG THANH TOÁN
                </Text>
                <Text className="text-lg font-bold text-blue-700">
                    {formatPrice(ticketSelected.total)} đ
                </Text>
            </Box>

            <Box className="flex flex-col mt-2">
                <Input.TextArea
                    placeholder="Nhập lý do ở đây...."
                    helperText="Nhập lý do hủy"
                    className={`${!isCancel ? "hidden" : "visible"}`}
                    onChange={(e) => onChange?.(e.target.value)}
                />
                <Box className="flex justify-end">
                    <Button
                        loading={loadingCancel}
                        onClick={onCancel}
                        type="danger"
                        size="small"
                    >
                        {isCancel ? "Xác nhận" : "Hủy vé"}
                    </Button>
                </Box>
            </Box>

        </Modal >
    )
}

export default DetailTicket