import { formatPrice } from "@/helper/formatPrice";
import { FC } from "react";
import { Box, Button, Text } from "zmp-ui";
import ButtonOrder from "../common/buttons/ButtonOrder";

interface ConfirmSectionProps {
    loading?: boolean
    total: number;
    onConfirm: (messageToken) => void;
}

const ConfirmSection: FC<ConfirmSectionProps> = ({ total, onConfirm, loading }) => {
    return (
        <Box className="sticky bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
            <Box className="flex justify-between items-center px-5 py-4 gap-4">
                <Box className="flex flex-col gap-1">
                    <Text className="text-gray-500 text-md font-medium uppercase tracking-wide">
                        Tổng thanh toán
                    </Text>
                    <Box className="flex items-baseline gap-1">
                        <Text className="font-bold text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {formatPrice(total)}
                        </Text>
                        <Text className="font-semibold text-lg text-green-600">đ</Text>
                    </Box>
                </Box>

                <ButtonOrder onOrder={onConfirm} />

                {/* <Button
                    loading={loading}
                    onClick={onConfirm}
                    className="relative animate-bounce overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95 text-white font-bold px-8 py-3.5 shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40"
                >
                    <span className="relative z-10">Xác nhận</span>
                    <Box className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                </Button> */}
            </Box>
        </Box>
    );
};

export default ConfirmSection;