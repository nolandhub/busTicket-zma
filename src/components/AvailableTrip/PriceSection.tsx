import { Sale } from "@/types/tripType"

interface Props {
    typePrice: "fixed" | "byRoom" | "byRow"
    originPrice: number | number[]
    sale?: Sale
}



export default function PriceSection() {
    return (
        <>
            {/* <div className="flex-1 grid grid-rows-3 justify-end">
                        <Text className="text-md font-bold text-end"> {formatPrice(230000)}đ</Text>
                        {false && <div className="flex items-start space-x-1">
                            <Text className="text-slate-800 line-through text-xs">{formatPrice(250000)}đ</Text>
                            <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{8}% </Text>
                        </div>}
                        {false && <div className="flex flex-col items-end row-span-2 space-x-1 space-y-1">
                            <Text className="text-slate-800 line-through text-xs ">{formatPrice(250000)}đ</Text>
                            <Text className="text-white text-xs bg-green-500 rounded-lg p-1 font-bold">GIẢM {formatPrice(20000)}đ </Text>
                        </div>}
                    </div> */}

            {/* <div className="flex-1 grid grid-rows-3 items-start justify-end">
                        <div className="flex-1 flex flex-row items-center justify-end space-x-1">
                            <Text className="text-slate-400 text-xs" >Từ</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(450000)}đ</Text>
                            <Text className="text-md font-bold">-</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(500000)}đ</Text>
                        </div>

                        {false &&
                            <>
                                <div className="flex flex-row justify-end items-start space-x-1">
                                    <Text className="text-slate-600 line-through text-xs">{formatPrice(47000000)}đ </Text>
                                    <Text className="text-xs font-bold">-</Text>
                                    <Text className="text-slate-600 line-through text-xs">  {formatPrice(52000000)}đ</Text>
                                    <Text className="text-white text-xs bg-red-500 rounded-full px-1 font-bold">-{10}% </Text>
                                </div>

                            </>
                        }

                        {false &&
                            <>
                                <div className="flex flex-row justify-end space-x-1">
                                    <Text className="text-slate-600 line-through text-xs">{formatPrice(470000)}đ </Text>
                                    <Text className="text-xs font-bold">-</Text>
                                    <Text className="text-slate-600 line-through text-xs">  {formatPrice(520000)}đ</Text>
                                </div>
                                <div className="flex flex-row justify-end items-start space-x-1">
                                    <Text className="text-white bg-green-500 rounded-lg p-1 font-bold text-xs">GIẢM {formatPrice(20000)}đ </Text>
                                </div>
                            </>
                        }
                        <button onClick={() => { console.log("void") }} className="underline text-end text-indigo-700 text-md">Chi tiết giá</button>

                    </div> */}

        </>
    )


}