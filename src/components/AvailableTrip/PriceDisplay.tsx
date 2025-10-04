import { formatPrice } from "@/helper/formatPrice";
import { FlashSale, PriceDetail } from "@/types/tripType";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Box, Text } from 'zmp-ui';

interface Props {
    originPrice: PriceDetail | PriceDetail[]
    flashSale: FlashSale | null
    onDetailClick?: () => void
}

export default function PriceDisplay({ originPrice, flashSale, onDetailClick }: Props) {
    const resOri = returnMinMaxArray(originPrice);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        if (!flashSale?.endTime) return;

        const updateTime = () => {
            const now = dayjs();
            const end = dayjs(flashSale.endTime);
            const diff = end.diff(now, "seconds");
            setRemainingTime(diff > 0 ? diff : 0);
        };

        updateTime(); // run first render
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [flashSale?.endTime]);


    const isFlashSaleActive = flashSale?.isActive && remainingTime > 0;

    if (isFlashSaleActive && flashSale) {
        const resFin = returnMinMaxArray(flashSale.saleDetail.finalPrice);
        const isFinPrice = Array.isArray(flashSale.saleDetail.finalPrice);
        const isPercent = flashSale.saleDetail.type === "percent";

        // Range price & flash sale
        if (isFinPrice && 'minOut' in resFin && 'minOut' in resOri) {
            return (
                <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                    <div className="flex flex-row justify-end space-x-1 items-baseline">
                        <Text className="text-slate-500 text-[10px]">Từ</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resFin.minOut)}đ</Text>
                        <Text className="text-md font-bold">-</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resFin.maxOut)}đ</Text>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row justify-end space-x-1">
                            <Text className="text-slate-600 line-through text-xs">{formatPrice(resOri.minOut)}đ</Text>
                            <Text className="text-xs font-bold">-</Text>
                            <Text className="text-slate-600 line-through text-xs">{formatPrice(resOri.maxOut)}đ</Text>
                        </div>
                        <div className="flex flex-row justify-end space-x-1">
                            {isPercent ? (
                                <Text className="text-white text-xs bg-red-500 rounded-full px-1 font-bold">
                                    -{flashSale.saleDetail.value}%
                                </Text>
                            ) : (
                                <Text className="text-white bg-green-500 rounded-lg px-1 font-bold text-xs">
                                    GIẢM {formatPrice(flashSale.saleDetail.value)}đ
                                </Text>
                            )}
                        </div>
                    </div>

                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">
                        Chi tiết giá
                    </Text>
                </Box>
            );
        }

        // Single price & flash sale
        if (!isFinPrice && 'value' in flashSale.saleDetail.finalPrice && 'value' in resOri) {
            return (
                <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                    <Text className="text-md font-bold text-end">
                        {formatPrice(flashSale.saleDetail.finalPrice.value)}đ
                    </Text>

                    <div className="flex flex-col gap-1 items-end justify-end">
                        <Text className="text-slate-800 line-through text-xs">
                            {formatPrice(resOri.value)}đ
                        </Text>
                        {isPercent ? (
                            <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">
                                -{flashSale.saleDetail.value}%
                            </Text>
                        ) : (
                            <Text className="text-white text-xs bg-green-500 rounded-lg font-bold px-1">
                                GIẢM {formatPrice(flashSale.saleDetail.value)}đ
                            </Text>
                        )}
                    </div>

                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">
                        Chi tiết giá
                    </Text>
                </Box>
            );
        }
    }

    // Base case 
    return (
        <Box className="flex flex-col flex-1 gap-1 justify-end h-fit">
            {Array.isArray(originPrice) && 'minOut' in resOri ? (  /* 'minOut' in resOri  Check resOrigin have obj minOut  */
                <>
                    <div className="flex flex-row justify-end space-x-1 items-baseline">
                        <Text className="text-slate-500 text-[10px]">Từ</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resOri.minOut)}đ</Text>
                        <Text className="text-md font-bold">-</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resOri.maxOut)}đ</Text>
                    </div>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">
                        Chi tiết giá
                    </Text>
                </>
            ) : (
                <>
                    <Text className="text-md font-bold text-end">
                        {formatPrice(resOri.value)}đ
                    </Text>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">
                        Chi tiết giá
                    </Text>
                </>
            )}
        </Box>
    );
}

export function returnMinMaxArray(price: PriceDetail | PriceDetail[]) {
    if (Array.isArray(price)) {
        const values = price.map((p) => p.value);
        return {
            minOut: Math.min(...values),
            maxOut: Math.max(...values)
        };
    }
    return { value: price.value };
}
