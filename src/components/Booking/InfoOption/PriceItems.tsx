import { formatPrice } from "@/helper/formatPrice";
import { PriceDetail } from "@/types/tripType";
import { Box, Text } from "zmp-ui";
import { FC } from "react";
import { Clock } from "lucide-react";
import QuantityControl from "./QuatityControl";

interface PriceItemProps {
    priceDetail: PriceDetail;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

interface PriceInfoProps {
    label: string;
    value: number;
}

const PriceInfo: FC<PriceInfoProps> = ({ label, value }) => (
    <Box className="flex flex-col">
        <Text className="text-md text-slate-600 font-medium">{label}</Text>
        <Box className="flex items-baseline gap-1">
            <Text className="text-2xl font-bold text-emerald-600">
                {formatPrice(value)}
            </Text>
            <Text className="text-lg font-medium text-emerald-600">đ</Text>
        </Box>
    </Box>
);

const PriceItem: FC<PriceItemProps> = ({
    priceDetail,
    quantity,
    onIncrease,
    onDecrease,
}) => {
    // Vì InfoOption đã map và truyền detail: [detail], nên chỉ có 1 item
    const detail = priceDetail.detail[0];

    if (!detail) {
        console.error("PriceItem: No detail found", priceDetail);
        return null;
    }

    return (
        <Box className="bg-white rounded-xl shadow-sm border-2 border-slate-100 hover:border-emerald-200 
                        hover:shadow-md transition-all duration-200 overflow-hidden">

            {/* Time display */}
            {priceDetail.time && (
                <Box className="bg-emerald-50 px-4 py-2 border-b border-emerald-100">
                    <Box className="flex items-center gap-1">
                        <Clock size={14} className="text-emerald-600" />
                        <Text className="text-xs text-emerald-700 font-medium">
                            {priceDetail.time}
                        </Text>
                    </Box>
                </Box>
            )}

            {/* Price and quantity control */}
            <Box className="px-4 pt-4 pb-2">
                <Text className="text-xs text-slate-500 mb-2">Chọn loại:</Text>
                <Box className="flex bg-slate-100 items-center justify-between p-3 rounded-md border border-slate-200">
                    <PriceInfo
                        label={detail.label}
                        value={detail.value}
                    />
                    <QuantityControl
                        quantity={quantity}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PriceItem;