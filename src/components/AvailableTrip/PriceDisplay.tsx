import { formatPrice } from "@/helper/formatPrice";
import { FlashSale, PriceDetail, SaleDetail } from "@/types/tripType";
import { Box, Text } from 'zmp-ui';

interface Props {
    originPrice: PriceDetail | PriceDetail[]
    flashSale: FlashSale | null
    onDetailClick?: () => void
}

export default function PriceDisplay({ originPrice, flashSale, onDetailClick }: Props) {
    const resOri = returnMinMaxArray(originPrice)

    if (flashSale && flashSale.isActive == true) {
        const resFin = returnMinMaxArray(flashSale.saleDetail.finalPrice)
        const isArray = Array.isArray(flashSale.saleDetail.finalPrice)


        if (isArray && resOri && resFin) {   //RangePrice + saleDetail
            if (flashSale.saleDetail.type == "percent") {      //percent
                return (
                    <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                        <div className="flex flex-row justify-end space-x-1 items-baseline">
                            <Text className="text-slate-500 text-[10px]" >Từ</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(resFin.minOut)}đ</Text>
                            <Text className="text-md font-bold">-</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(resFin.maxOut)}đ</Text>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row justify-end space-x-1">
                                <Text className="text-slate-600 line-through text-xs">{formatPrice(resOri.minOut)}đ </Text>
                                <Text className="text-xs font-bold">-</Text>
                                <Text className="text-slate-600 line-through text-xs">  {formatPrice(resOri.maxOut)}đ</Text>
                            </div>
                            <div className="flex flex-row justify-end space-x-1">
                                <Text className="text-white text-xs bg-red-500 rounded-full px-1 font-bold">-{flashSale.saleDetail.value}% </Text>
                            </div>
                        </div>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </Box>
                )
            }
            return (                        //fixed amount
                <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                    <div className="flex flex-row justify-end space-x-1 items-baseline">
                        <Text className="text-slate-500 text-[10px]" >Từ</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resFin.minOut)}đ</Text>
                        <Text className="text-md font-bold">-</Text>
                        <Text className="text-md font-bold text-end">{formatPrice(resFin.maxOut)}đ</Text>
                    </div>
                    <div className="flex flex-row justify-end space-x-1">
                        <Text className="text-slate-600 line-through text-xs">{formatPrice(resOri.minOut)}đ </Text>
                        <Text className="text-xs font-bold">-</Text>
                        <Text className="text-slate-600 line-through text-xs">  {formatPrice(resOri.maxOut)}đ</Text>
                    </div>
                    <div className="flex flex-row justify-end space-x-1">
                        <Text className="text-white bg-green-500 rounded-lg px-1 font-bold text-xs">GIẢM {formatPrice(flashSale.saleDetail.value)}đ </Text>
                    </div>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                </Box>
            )
        }
        else if (!Array.isArray(flashSale.saleDetail.finalPrice)) {
            if (flashSale.saleDetail.type == "percent") {
                return (                                    //percent
                    <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                        <Text className="text-md font-bold text-end"> {formatPrice(flashSale.saleDetail.finalPrice.value)}đ</Text>
                        <div className="flex flex-col gap-1 items-end justify-end">
                            <Text className="text-slate-800 line-through text-xs">{formatPrice(resOri.value)}đ</Text>  {/*Origin Price    */}
                            <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{flashSale.saleDetail.value}%</Text>
                        </div>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </Box>
                )
            }
            return (                                    //percent
                <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                    <Text className="text-md font-bold text-end"> {formatPrice(flashSale.saleDetail.finalPrice.value)}đ</Text>
                    <div className="flex flex-col gap-1 items-end justify-end">
                        <Text className="text-slate-800 line-through text-xs">{formatPrice(resOri.value)}đ</Text>  {/*Origin Price    */}
                        <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{formatPrice(flashSale.saleDetail.value)}đ </Text>
                    </div>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>

                </Box>
            )
        }


    }

    return (                            //base case (No sale)
        <Box className="flex flex-col flex-1 gap-1 justify-end h-fit">
            {
                Array.isArray(originPrice) ?
                    <>
                        <div className="flex flex-row justify-end space-x-1 items-baseline">
                            <Text className="text-slate-500 text-[10px]" >Từ</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(resOri.minOut)}đ</Text>
                            <Text className="text-md font-bold">-</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(resOri.maxOut)}đ</Text>
                        </div>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </>
                    :
                    <>
                        <Text className="text-md font-bold text-end"> {formatPrice(resOri.value)}đ</Text>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </>
            }
        </Box>
    );
}

export function returnMinMaxArray(price: PriceDetail | PriceDetail[]) {
    if (Array.isArray(price)) {
        const values = price.map((p) => p.value)
        const minOut = Math.min(...values)
        const maxOut = Math.max(...values)
        return { minOut, maxOut }
    } else {
        return { value: price.value }
    }
}


