import { Box, Icon, Input, Text } from "zmp-ui"

import { FlashSale, PriceDetail } from "@/types/tripType"
import { formatPrice } from "@/helper/formatPrice"
import { useBookingOption } from "@/hooks/useBookingOption"
import PriceItem from "./PriceItem"
import { FC, useEffect } from "react"

interface OptionPriceProps {
    originPrice: PriceDetail | PriceDetail[]
    flashSale?: FlashSale | null
}

const InfoOption: FC<OptionPriceProps> = ({ originPrice, flashSale }) => {
    const activePrice =
        flashSale?.isActive && flashSale ? flashSale.saleDetail.finalPrice : originPrice
    const priceArray = Array.isArray(activePrice) ? activePrice : [activePrice]

    const { name, phone, setName, setPhone, quantities, updateQuantity, total, saveInfoStep } =
        useBookingOption(priceArray)

    useEffect(() => {
        saveInfoStep()
    }, [name, phone, total])

    return (
        <Box className="flex-1 flex-col gap-4 p-5 bg-slate-50 rounded-2xl">
            <Text bold size="xLarge" className="text-center">Thông tin</Text>

            <Input
                prefix={<Box pl={4}><Icon icon="zi-info-circle" /></Box>}
                label="Tên người đi"
                value={name}
                onChange={(n) => setName(n.target.value)}
            />
            <Input
                prefix={<Box pl={4}><Icon icon="zi-call" /></Box>}
                label="Số điện thoại"
                value={phone}
                onChange={(p) => setPhone(p.target.value)}
            />

            <Box className="flex flex-col gap-3">
                {priceArray.map((priceDetail) => (
                    <PriceItem
                        key={priceDetail?.label}
                        priceDetail={priceDetail}
                        quantity={quantities[priceDetail?.label] || 0}
                        onIncrease={() => updateQuantity(priceDetail?.label, +1)}
                        onDecrease={() => updateQuantity(priceDetail?.label, -1)}
                    />
                ))}
            </Box>

            <Box className="bg-white rounded-xl p-4 shadow-sm border-2 border-emerald-100 mt-2">
                <Box className="flex justify-between items-center">
                    <Text className="text-base font-semibold text-slate-700">Tổng thanh toán:</Text>
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