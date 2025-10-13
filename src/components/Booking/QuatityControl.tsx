import { Minus, Plus } from "lucide-react"
import { FC } from "react"
import { Box, Text } from "zmp-ui"


interface QuantityControlProps {
    quantity: number
    onDecrease: () => void
    onIncrease: () => void
}

const QuantityControl: FC<QuantityControlProps> = ({ quantity, onDecrease, onIncrease }) => (
    <Box className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
        <button
            onClick={onDecrease}
            disabled={quantity <= 0}
            className="bg-emerald-500 w-11 h-11 rounded-lg flex items-center justify-center transition-all 
                 hover:bg-emerald-600 active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed 
                 shadow-sm disabled:shadow-none"
        >
            <Minus strokeWidth={2.5} size={20} color="white" />
        </button>

        <Box className="flex-1 text-center">
            <Text className="text-xs text-slate-500 font-medium mb-0.5">Số lượng</Text>

            <Text className="text-2xl font-bold text-emerald-600 select-none">
                {quantity}
            </Text>
        </Box>

        <button
            onClick={onIncrease}
            className="bg-emerald-500 w-11 h-11 rounded-lg flex items-center justify-center transition-all 
                 hover:bg-emerald-600 active:scale-95 shadow-sm"
        >
            <Plus strokeWidth={2.5} size={20} color="white" />
        </button>
    </Box>
)

export default QuantityControl