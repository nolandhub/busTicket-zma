// import { Minus, Plus } from "lucide-react"
// import { Box, Button, Icon, Text } from "zmp-ui"
// import { FC, useState } from "react"
// import { FlashSale, PriceDetail } from "@/types/tripType"
// import { formatPrice } from "@/helper/formatPrice"
// import dayjs from "dayjs"
// import { departureDateState, departureState } from "@/state"
// import { useRecoilValue } from "recoil"

// interface PriceInfoProps {
//     label?: string
//     value?: number
// }

// const PriceInfo: FC<PriceInfoProps> = ({ label, value }) => (
//     <Box className="flex flex-col gap-1">
//         <Text className="text-sm text-gray-500 font-medium tracking-wide">{label}</Text>
//         <Text className="text-2xl font-bold text-green-600 leading-none">
//             {formatPrice(value)}<span className="text-lg ml-1 font-semibold">đ</span>
//         </Text>
//     </Box>
// )

// interface QuantityControlProps {
//     quantity: number
//     onDecrease: () => void
//     onIncrease: () => void
// }

// const QuantityControl: FC<QuantityControlProps> = ({ quantity, onDecrease, onIncrease }) => (
//     <Box className="flex items-center justify-between w-full mt-3">
//         <button
//             onClick={onDecrease}
//             disabled={quantity <= 0}
//             className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-all 
//                  hover:bg-green-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
//         >
//             <Minus strokeWidth={3} size={18} color="white" />
//         </button>

//         <Text className="text-2xl font-bold text-green-700 select-none">
//             {quantity}
//         </Text>

//         <button
//             onClick={onIncrease}
//             className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-all 
//                  hover:bg-green-700 active:scale-95 shadow-md"
//         >
//             <Plus strokeWidth={3} size={18} color="white" />
//         </button>
//     </Box>
// )

// interface PriceItemProps {
//     priceDetail: PriceDetail;
//     quantity: number;
//     onIncrease: () => void;
//     onDecrease: () => void;
// }

// const PriceItem: FC<PriceItemProps> = ({ priceDetail, quantity, onIncrease, onDecrease }) => (
//     <Box className="bg-white border border-green-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-green-300 transition-all">
//         <Box className="flex justify-between items-center">
//             <PriceInfo label={priceDetail?.label} value={priceDetail?.value} />
//             <Box className="text-right">
//                 <Text className="text-sm text-gray-400">Đã chọn:</Text>
//                 <Text className="text-lg font-semibold text-green-600">{quantity}</Text>
//             </Box>
//         </Box>

//         <QuantityControl
//             quantity={quantity}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//         />
//     </Box>
// )

// interface OptionPriceProps {
//     originPrice: PriceDetail | PriceDetail[]
//     flashSale?: FlashSale | null
// }

// const OptionPrice: FC<OptionPriceProps> = ({ originPrice, flashSale }) => {
//     const [quantities, setQuantities] = useState<Record<string, number>>({})

//     const departDate = useRecoilValue(departureDateState)
//     const updateQuantity = (label: string, delta: number) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [label]: Math.max((prev[label] || 0) + delta, 0),
//         }))
//     }

//     const activePrice =
//         flashSale?.isActive && flashSale ? flashSale.saleDetail.finalPrice : originPrice
//     const priceArray = Array.isArray(activePrice) ? activePrice : [activePrice]

//     const total = priceArray.reduce(
//         (sum, p) => sum + (quantities[p.label] || 0) * p.value,
//         0
//     )

//     return (
//         <Box className="flex flex-col gap-4 p-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
//             {flashSale?.isActive && dayjs(flashSale.endTime).valueOf() > dayjs(departDate).valueOf() && (
//                 <Box className="flex items-center justify-center bg-yellow-400 text-green-800 font-bold py-2 rounded-xl mb-2">
//                     🎉 FLASH SALE ĐANG DIỄN RA 🎉
//                 </Box>
//             )}

//             {priceArray.map((priceDetail) => (
//                 <PriceItem
//                     key={priceDetail?.label}
//                     priceDetail={priceDetail}
//                     quantity={quantities[priceDetail?.label] || 0}
//                     onIncrease={() => updateQuantity(priceDetail?.label, +1)}
//                     onDecrease={() => updateQuantity(priceDetail?.label, -1)}
//                 />
//             ))}
//             <Box className="flex justify-end">
//                 <Text className="text-xl font-bold text-green-700 bg-yellow-200 p-2 w-fit rounded-lg">
//                     Tổng cộng: {formatPrice(total)}đ
//                 </Text>
//             </Box>

//             <div className="flex justify-center mt-2">
//                 <Button suffixIcon={<Icon icon="zi-arrow-right" />} disabled={total == 0} size="large">Tiếp tục</Button>

//             </div>


//         </Box>
//     )
// }

// export default OptionPrice

import { Minus, Plus } from "lucide-react"
import { Box, Button, Icon, Text } from "zmp-ui"
import { FC, useState } from "react"
import { FlashSale, PriceDetail } from "@/types/tripType"
import { formatPrice } from "@/helper/formatPrice"
import dayjs from "dayjs"
import { departureDateState, departureState } from "@/state"
import { useRecoilValue } from "recoil"

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

interface PriceItemProps {
    priceDetail: PriceDetail;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

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

interface OptionPriceProps {
    originPrice: PriceDetail | PriceDetail[]
    flashSale?: FlashSale | null
}

const OptionPrice: FC<OptionPriceProps> = ({ originPrice, flashSale }) => {
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    const departDate = useRecoilValue(departureDateState)
    const updateQuantity = (label: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [label]: Math.max((prev[label] || 0) + delta, 0),
        }))
    }

    const activePrice =
        flashSale?.isActive && flashSale ? flashSale.saleDetail.finalPrice : originPrice
    const priceArray = Array.isArray(activePrice) ? activePrice : [activePrice]

    const total = priceArray.reduce(
        (sum, p) => sum + (quantities[p.label] || 0) * p.value,
        0
    )

    return (
        <Box className="flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl">
            {flashSale?.isActive && dayjs(flashSale.endTime).valueOf() > dayjs(departDate).valueOf() && (
                <Box className="bg-amber-400 rounded-xl p-4 shadow-md border-2 border-amber-500">
                    <Box className="flex items-center justify-center gap-2">
                        <Text className="text-2xl">🎉</Text>
                        <Text className="text-base font-bold text-amber-900 text-center">
                            FLASH SALE ĐANG DIỄN RA
                        </Text>
                        <Text className="text-2xl">🎉</Text>
                    </Box>
                </Box>
            )}

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

            <Box className="mt-2">
                <Button
                    suffixIcon={<Icon icon="zi-arrow-right" />}
                    disabled={total === 0}
                    size="large"
                    className="w-full"
                >
                    Tiếp tục
                </Button>
            </Box>
        </Box>
    )
}

export default OptionPrice