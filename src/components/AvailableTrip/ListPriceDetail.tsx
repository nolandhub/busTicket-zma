import { formatPrice } from "@/helper/formatPrice"
import { priceOptionState } from "@/state"
import { PriceByTime } from "@/types/tripType"
import { Clock } from "lucide-react"
import { FC } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Text } from "zmp-ui"

interface Props {
    prices: PriceByTime[]
}

const ListPriceDetail: FC<Props> = ({ prices }) => {
    const setPriceOpt = useSetRecoilState(priceOptionState)
    const selectedPrice = useRecoilValue(priceOptionState)

    const selectPriceOption = (price: PriceByTime) => {
        setPriceOpt(price)
    }


    return (
        <div className="space-y-3 p-3 bg-white rounded-b-lg border">
            {prices.map((timeSlot, idx) => {
                const isSelected = selectedPrice?.time === timeSlot.time

                return (
                    <div
                        key={idx}
                        onClick={() => selectPriceOption(timeSlot)}
                        className={`rounded-lg p-3 border transition cursor-pointer 
                                ${isSelected
                                ? "bg-green-600 border-green-700"
                                : "bg-green-50 border-green-200 hover:bg-green-100"}
            `}
                    >
                        {/* Time header */}
                        {timeSlot.time && (
                            <div className="flex items-center gap-1 mb-2 pb-2 border-b border-green-200">
                                <Clock
                                    size={14}
                                    className={isSelected ? "text-white" : "text-green-600"}
                                />
                                <Text
                                    className={`text-xs font-medium ${isSelected ? "text-white" : "text-green-700"
                                        }`}
                                >
                                    {timeSlot.time}
                                </Text>
                            </div>
                        )}

                        {/* Detail items */}
                        <div className="space-y-2">
                            {timeSlot.detail.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="flex justify-between items-center"
                                >
                                    <Text className={isSelected ? "text-green-100" : "text-gray-700"}>
                                        {item.label}
                                    </Text>
                                    <Text
                                        className={`text-lg font-semibold ${isSelected ? "text-white" : "text-green-600"
                                            }`}
                                    >
                                        {formatPrice(item.finalPrice)}đ
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListPriceDetail
