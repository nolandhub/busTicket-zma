import { formatPrice } from "@/helper/formatPrice";
import { PriceDetail } from "@/types/tripType";
import { Box, Text } from "zmp-ui";
import QuantityControl from "./QuatityControl";
import { FC } from "react";

interface PriceItemProps {
    priceDetail: PriceDetail;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

interface PriceInfoProps {
    label?: string
    value?: number
}

const PriceInfo: FC<PriceInfoProps> = ({ label, value }) => (
    <Box className="flex flex-col gap-1.5">
        <Text className="text-sm text-slate-600 font-medium">{label}</Text>
        <Box className="flex items-baseline gap-1">
            <Text className="text-3xl font-bold text-emerald-600">
                {formatPrice(value)}
            </Text>
            <Text className="text-lg font-medium text-emerald-600">đ</Text>
        </Box>
    </Box>
)

const PriceItem: FC<PriceItemProps> = ({ priceDetail, quantity, onIncrease, onDecrease }) => (

    <Box className="bg-white rounded-xl p-5 shadow-sm border-2 border-slate-100 hover:border-emerald-200 
                    hover:shadow-md transition-all duration-200">
        <Box className="flex justify-between items-start mb-4">
            <PriceInfo label={priceDetail?.label} value={priceDetail?.value} />

            {quantity > 0 && (
                <Box className="bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                    <Text className="text-xs text-emerald-600 font-medium mb-0.5">Đã chọn</Text>
                    <Text className="text-xl font-bold text-emerald-600 text-center">{quantity}</Text>
                </Box>
            )}
        </Box>

        <QuantityControl
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    </Box>
)

export default PriceItem