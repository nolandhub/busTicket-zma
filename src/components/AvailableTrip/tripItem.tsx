import { Box, Button, Icon, Text } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";
import { Heart, Zap, WalletIcon, HandshakeIcon } from "lucide-react";
import { formatPrice } from "@/helper/formatPrice";
import { Divider } from "../common/Divider";
import { useState } from "react";
import LabelWithIcon from "./SpecialPrivacy_LabelIcon";

export function TripItem() {
    const [liked, setLiked] = useState<boolean>(false)
    return (
        <Box className="bg-white rounded-xl border border-slate-300 md:max-w-lg mx-auto shadow-lg">
            {true && (
                <Box className="flex items-center justify-between bg-white rounded-t-xl overflow-hidden">
                    <div className="flex flex-1 items-center justify-center bg-green-500 border-r border-slate-300 py-1">
                        <Zap size={20} strokeWidth={4} fill="yellow" color="yellow" />
                        <Text bold className="text-white ml-1">Flash Sale</Text>
                    </div>

                    <div className="flex flex-1 items-center justify-center py-1">
                        <Text className="text-green-700 font-semibold text-sm">
                            Kết thúc sau <span className="text-red-500 text-md font-bold">12:15:20</span>
                        </Text>
                    </div>
                </Box>
            )}

            <Box className="bg-white p-2">
                <Box className="flex-1 flex flex-row ">
                    <RouteIndicator
                        startLocation="Rạp xiếc trung ương"
                        endLocation="VP Nha Trang"
                        startTime="13:00"
                        duration="1h 40p"
                        endTime="14:40"
                    />

                    <div className="flex flex-col flex-1 gap-1 justify-end items-end">
                        <Text className="text-md font-bold text-end"> {formatPrice(230000)}đ</Text>
                        {false &&
                            <>
                                <div className="flex flex-col gap-1 items-end justify-end">
                                    <Text className="text-slate-800 line-through text-xs">{formatPrice(250000)}đ</Text>
                                    <Text className="text-white text-xs bg-red-500 rounded-full font-bold px-1">-{8}% </Text>
                                </div>
                            </>
                        }
                        {true &&
                            <>

                                <div className="flex flex-col gap-1 items-end justify-end">
                                    <Text className="text-slate-800 line-through text-xs text-end">{formatPrice(250000)}đ</Text>
                                    <Text className="text-white text-xs bg-green-500 rounded-lg p-1 font-bold">GIẢM {formatPrice(20000)}đ </Text>
                                </div>
                            </>
                        }
                    </div>

                    {/* <div className="flex flex-col flex-1 gap-1 justify-end items-end">
                        <div className="flex flex-row justify-end space-x-1 items-baseline">
                            <Text className="text-slate-500 text-[10px]" >Từ</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(450000)}đ</Text>
                            <Text className="text-md font-bold">-</Text>
                            <Text className="text-md font-bold text-end">{formatPrice(500000)}đ</Text>
                        </div>

                        {false &&
                            <>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row justify-end space-x-1">
                                        <Text className="text-slate-600 line-through text-xs">{formatPrice(47000000)}đ </Text>
                                        <Text className="text-xs font-bold">-</Text>
                                        <Text className="text-slate-600 line-through text-xs">  {formatPrice(52000000)}đ</Text>
                                    </div>
                                    <div className="flex flex-row justify-end space-x-1">
                                        <Text className="text-white text-xs bg-red-500 rounded-full px-1 font-bold">-{10}% </Text>
                                    </div>
                                </div>
                            </>
                        }

                        {true &&
                            <>
                                <div className="flex flex-row justify-end space-x-1">
                                    <Text className="text-slate-600 line-through text-xs">{formatPrice(470000)}đ </Text>
                                    <Text className="text-xs font-bold">-</Text>
                                    <Text className="text-slate-600 line-through text-xs">  {formatPrice(520000)}đ</Text>
                                </div>
                                <div className="flex flex-row justify-end space-x-1">
                                    <Text className="text-white bg-green-500 rounded-lg p-1 font-bold text-xs">GIẢM {formatPrice(20000)}đ </Text>
                                </div>
                            </>
                        }
                        <Text onClick={() => { console.log("void") }} className="underline underline-offset-2 font-medium text-end text-indigo-700 text-md">Chi tiết giá</Text>
                    </div> */}
                </Box>

                <Divider className="my-2" size={1} />

                <Box className="flex flex-row items-start">
                    <div className="flex-shrink-0">
                        <img className="h-[80px] w-[80px] object-cover rounded-xl" src="https://picsum.photos/400/300" />
                    </div>
                    <div className="flex-1 flex-col p-2">
                        <Text className="text-lg font-bold">Cúc Tùng Limousine</Text>
                        <Text className="text-sm font-normal">Limousine 21 Phòng Đơn </Text>
                    </div>
                    <Heart
                        size={20}
                        className={`mt-4 ${liked ? "text-red-500 fill-red-500" : "text-gray-500"
                            }`}
                        onClick={() => setLiked(!liked)}
                    />
                </Box>

                <Box className="flex flex-row mt-2 items-center">
                    <Box className="flex flex-wrap max-w-[170px] gap-2">
                        <LabelWithIcon icon={<Zap size={12} strokeWidth={2} fill="green" color="green" />
                        } label="Xác nhận tức thì" />
                        <LabelWithIcon icon={<WalletIcon className="text-green-400" size={12} color="green" />
                        } label="Không cần thanh toán trước" />
                        <LabelWithIcon icon={<HandshakeIcon size={12} color="green" />} label="Đón trả tận nơi" />
                    </Box>
                    <div className="flex-1 text-end">
                        <Button className="bg-green-600" size="small">Chọn</Button>
                    </div>
                </Box>
            </Box>

            <Text className="flex-1 p-1 bg-green-100 rounded-b-xl text-xs italic text-gray-600 text-end mt-1 border border-slate-200">
                Chi tiết nhà xe, giá vé, chính sách và hoàn hủy
                <button onClick={() => { console.log("Open Sheet") }}>
                    <Icon className="ml-1 text-blue-500" size={16} icon="zi-info-circle" />
                </button>
            </Text>
        </Box >

    );
}











