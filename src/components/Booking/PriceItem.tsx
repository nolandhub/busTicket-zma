import { formatPrice } from "@/helper/formatPrice";
import { PriceDetail } from "@/types/tripType";
import { Box, Text } from "zmp-ui";
import QuantityControl from "./QuatityControl";
import { FC } from "react";
import { Clock } from "lucide-react";

interface PriceItemProps {
    priceDetail: PriceDetail;
    selectedDetailIndex: number; // Index của detail item được chọn
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onSelectDetail?: (index: number) => void; // Optional: cho phép switch giữa các detail
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
    selectedDetailIndex,
    quantity,
    onIncrease,
    onDecrease,
    onSelectDetail
}) => {
    // Lấy detail item được chọn
    const selectedDetail = priceDetail.detail[selectedDetailIndex] || priceDetail.detail[0];

    return (
        <Box className="bg-white rounded-xl shadow-sm border-2 border-slate-100 hover:border-emerald-200 
                        hover:shadow-md transition-all duration-200 overflow-hidden">

            {/* Time header (nếu có) */}
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

            {/* Price selection (nếu có nhiều detail items) */}
            {priceDetail.detail.length > 1 && onSelectDetail && (
                <Box className="px-4 pt-3 pb-2 border-b border-slate-100">
                    <Text className="text-xs text-slate-500 mb-2">Chọn loại:</Text>
                    <Box className="flex gap-2 flex-wrap">
                        {priceDetail.detail.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSelectDetail(idx)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${idx === selectedDetailIndex
                                    ? 'bg-emerald-500 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Main content */}
            <Box className="flex justify-between items-center p-5">
                <PriceInfo
                    label={selectedDetail.label}
                    value={Number(selectedDetail.value)}
                />

                <QuantityControl
                    quantity={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            </Box>
        </Box>
    );
};

export default PriceItem;