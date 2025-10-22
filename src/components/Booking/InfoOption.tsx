import { Box, Icon, Input, Text } from "zmp-ui"
import { PriceDetail } from "@/types/tripType"
import { formatPrice } from "@/helper/formatPrice"
import useBookingOption from "@/hooks/useBookingOption"
import { FC, useEffect } from "react"
import PickDrop from "../Booking/InfoOption/PickDrop"
import { debounce } from "lodash"
import PriceItem from "./InfoOption/PriceItems"

interface InfoOptionProps {
    price: PriceDetail
}

const InfoOption: FC<InfoOptionProps> = ({ price }) => {
    const {
        tripSelected,
        name,
        phone,
        setName,
        setPhone,
        quantities,
        updateQuantity,
        total,
        saveInfoStep
    } = useBookingOption(price)

    const saveInfoDebounced = debounce(() => {
        saveInfoStep()
    }, 500)

    useEffect(() => {
        saveInfoDebounced()
        return () => saveInfoDebounced.cancel()
    }, [name, phone, total, quantities])

    return (
        <Box className="flex-1 flex-col p-2 bg-slate-50 rounded-2xl">
            <Text bold size="xLarge" className="text-center">Thông tin</Text>

            {/* User Info */}
            <div className="flex flex-col gap-2 mt-4">
                <Input
                    prefix={<Box pl={4}><Icon icon="zi-info-circle" /></Box>}
                    label="Tên người đi"
                    value={name}
                    onChange={(n) => setName(n.target.value)}
                    placeholder="Nhập tên của bạn"
                />
                <Input
                    prefix={<Box pl={4}><Icon icon="zi-call" /></Box>}
                    label="Số điện thoại"
                    value={phone}
                    onChange={(p) => setPhone(p.target.value)}
                    placeholder="Nhập số điện thoại"
                />
            </div>

            {/* Price Items - Map qua từng detail */}
            <Box className="flex flex-col gap-2 mt-4">
                {price.detail.map((detail, idx) => (
                    <PriceItem
                        key={idx}
                        priceDetail={{
                            ...price,
                            detail: [detail] // Chỉ truyền 1 detail item
                        }}
                        quantity={quantities[idx] || 0}
                        onIncrease={() => updateQuantity(idx, 1)}
                        onDecrease={() => updateQuantity(idx, -1)}
                    />
                ))}
            </Box>

            {/* Pick & Drop */}
            <Box className="mt-4">
                {tripSelected && (
                    <PickDrop
                        hasTransfer={tripSelected.tripConfig.hasTransfer}
                        pickUp={tripSelected.activePickDrop.pickUp}
                        dropOff={tripSelected.activePickDrop.dropOff}
                    />
                )}
            </Box>

            {/* Total */}
            <Box className="bg-white rounded-xl p-4 shadow-sm border-2 border-emerald-100 mt-4">
                <Box className="flex justify-between items-center">
                    <Text className="text-base font-semibold text-slate-700">
                        Tổng thanh toán:
                    </Text>
                    <Box className="flex items-baseline gap-1">
                        <Text className="text-3xl font-bold text-emerald-600">
                            {formatPrice(total)}
                        </Text>
                        <Text className="text-xl font-semibold text-emerald-600">đ</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default InfoOption