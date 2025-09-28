import { formatPrice } from "@/helper/formatPrice";
import { SaleDetail } from "@/types/tripType";
import { Box, Text } from 'zmp-ui';

interface Props {
    originPrice: number | number[]
    saleDetail: SaleDetail
    isActive: boolean
    onDetailClick?: () => void
}

export default function PriceDisplay({ originPrice, saleDetail, isActive, onDetailClick }: Props) {
    const isArray = Array.isArray(originPrice)


    const resOri = returnMinMaxArray(originPrice)
    const resFin = returnMinMaxArray(saleDetail?.finalPrice!)

    if (isActive == true) {
        if (isArray && saleDetail && resOri && resFin) {   //RangePrice + saleDetail
            if (saleDetail.type == "percent") {      //percent
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
                                <Text className="text-white text-xs bg-red-500 rounded-full px-1 font-bold">-{saleDetail.value}% </Text>
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
                        <Text className="text-white bg-green-500 rounded-lg px-1 font-bold text-xs">GIẢM {formatPrice(saleDetail.value)}đ </Text>
                    </div>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                </Box>
            )
        }

        if (!isArray && saleDetail) {                         //singlePrice + saleDetail
            if (saleDetail.type == "percent") {
                return (                                    //percent
                    <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                        <Text className="text-md font-bold text-end"> {formatPrice(saleDetail.finalPrice)}đ</Text>
                        <div className="flex flex-col gap-1 items-end justify-end">
                            <Text className="text-slate-800 line-through text-xs">{formatPrice(originPrice)}đ</Text>  {/*Origin Price    */}
                            <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{saleDetail.value}% </Text>
                        </div>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>

                    </Box>
                )
            }
            return (                                       //fixed amount
                <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
                    <Text className="text-md font-bold text-end"> {formatPrice(saleDetail.finalPrice)}đ</Text>
                    <div className="flex flex-col gap-1 items-end justify-end">
                        <Text className="text-slate-800 line-through text-xs text-end">{formatPrice(originPrice)}đ</Text>      {/*Origin Price    */}
                        <Text className="text-white text-xs bg-green-500 rounded-lg px-1 font-bold">GIẢM {formatPrice(saleDetail.value)}đ </Text>
                    </div>
                    <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>

                </Box>
            );
        }
    }

    return (                            //base case (No sale)
        <Box className="flex flex-col flex-1 gap-1 justify-end h-fit">
            {
                isArray ?
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
                        <Text className="text-md font-bold text-end"> {formatPrice(originPrice)}đ</Text>
                        <Text onClick={onDetailClick} className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </>
            }
        </Box>
    );
}

export const returnMinMaxArray = (input: number | number[]) => {
    if (Array.isArray(input)) {
        const minOut = Math.min(...input)
        const maxOut = Math.max(...input)
        return { minOut, maxOut }
    }
    return { input }
}


