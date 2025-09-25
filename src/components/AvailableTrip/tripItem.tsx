import { Box, Button, Text } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";
import { Heart, HandCoins, Star, Zap, WalletIcon, Ban } from "lucide-react";
import { formatPrice } from "@/helper/formatPrice";
import { Divider } from "../common/Divider";
import { useState } from "react";
import LabelWithIcon from "../common/Extention";


export function TripItem() {
    const [liked, setLiked] = useState<boolean>(false)
    return (
        <Box className="bg-white rounded-xl border border-slate-300 md:max-w-lg mx-auto">
            {true && (
                <Box className="flex items-center justify-between bg-white rounded-t-xl overflow-hidden">
                    <div className="flex flex-1 items-center justify-center bg-blue-500 border-r border-indigo-400 py-1">
                        <Zap size={20} strokeWidth={4} fill="yellow" color="yellow" />
                        <Text bold className="text-slate-50 ml-1">Flash Sale</Text>
                    </div>

                    <div className="flex flex-1 items-center justify-center py-1">
                        <Text bold size="small" className="text-blue-600">
                            Kết thúc sau ...
                        </Text>
                    </div>
                </Box>
            )}

            <Box className="rounded-xl bg-gray-50 p-2 shadow-lg">
                <Box className="flex-1 flex flex-row ">
                    <RouteIndicator
                        startLocation="Rạp xiết trung ương"
                        endLocation="VP Nha Trang"
                        startTime="13:00"
                        duration="1h 40p"
                        endTime="14:40"
                    />

                    <div className="flex-1 grid grid-rows-3 justify-end items-center">
                        <Text className="text-md font-bold text-end"> {formatPrice(230000)}đ</Text>
                        {true &&
                            <>
                                <div className="flex items-center justify-end">
                                    <Text className="text-slate-800 line-through text-xs">{formatPrice(250000)}đ</Text>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{8}% </Text>
                                </div>
                            </>
                        }
                        {false &&
                            <>
                                <div className="flex items-center justify-end">
                                    <Text className="text-slate-800 line-through text-xs text-end">{formatPrice(250000)}đ</Text>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Text className="text-white text-xs bg-green-500 rounded-lg p-1 font-bold">GIẢM {formatPrice(20000)}đ </Text>
                                </div>
                            </>
                        }
                    </div>

                    {/* <div className="flex-1 grid grid-rows-2 items-start justify-end">
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

                </Box>

                <Divider className="my-2" size={1} />

                <Box className="flex">
                    <div className="h-fit">
                        <img className="h-[80px] w-[80px] object-cover rounded-xl" src="https://picsum.photos/400/300" />
                    </div>
                    <div className="flex-1 flex-col p-2">
                        <Text className="text-lg font-bold">Cúc Tùng Limousine</Text>
                        <Text className="text-sm font-normal">Limousine 21 Phòng Đơn </Text>
                    </div>
                    <div>
                        <Heart
                            size={20}
                            className={`mt-4 ${liked ? "text-red-500 fill-red-500" : "text-gray-500"
                                }`}
                            onClick={() => setLiked(!liked)}
                        />
                    </div>

                </Box>

                <Box className="flex flex-row mt-2 items-center justify-between">
                    <Box className="flex flex-wrap max-w-[170px] gap-2">
                        <LabelWithIcon icon={<Zap size={12} strokeWidth={2} fill="green" color="green" />
                        } label="Xác nhận tức thì" />
                        <LabelWithIcon icon={<WalletIcon className="text-green-400" size={12} color="green" />
                        } label="Không cần thanh toán trước" />
                        <LabelWithIcon icon={<Ban size={12} color="green" />} label="Hủy miễn phí" />
                    </Box>
                    <div className="flex-1 flex items-center justify-end">
                        <Button className="bg-green-600" size="small">Chọn</Button>
                    </div>
                </Box>

            </Box>

        </Box >



    );
}











