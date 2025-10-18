import { Minus, Plus } from "lucide-react"
import { FC } from "react"
import { Box, Text } from "zmp-ui"

interface QuantityControlProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

const QuantityControl: FC<QuantityControlProps> = ({ quantity, onDecrease, onIncrease }) => (
  <Box className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-2 shadow-sm">
    {/** Nút Giảm */}
    <button
      onClick={onDecrease}
      disabled={quantity <= 0}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500 
                 hover:bg-emerald-600 active:scale-95 text-white 
                 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
    >
      <Minus strokeWidth={2.5} size={20} />
    </button>

    {/** Hiển thị số lượng */}
    <Box className="flex-1 text-center select-none">
      <Text className="text-xs text-slate-500 font-medium">Số lượng</Text>
      <Text className="text-xl font-bold text-emerald-600">{quantity}</Text>
    </Box>

    {/** Nút Tăng */}
    <button
      onClick={onIncrease}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500 
       hover:bg-emerald-600 active:scale-95 text-white transition-all"
    >
      <Plus strokeWidth={2.5} size={20} />
    </button>
  </Box>
)

export default QuantityControl
