import { Box, Button, Icon, Text } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";
import { Zap, WalletIcon, HandshakeIcon } from "lucide-react";
import { Divider } from "../common/Divider";
import LabelWithIcon from "./SpecialPrivacy_LabelIcon";
import { Trip } from "@/types/tripType";
import SaleDisplay from "./PriceDisplay";
import FlashSaleCard from "./FlashSaleCard";
import TripContent from "./TripContent";
import { FC } from "react";


const TripItem: FC<{ trip: Trip }> = ({ trip }) => {
    return (
        <Box className="bg-white rounded-xl border border-slate-300 md:max-w-lg mx-auto shadow-lg">
            <FlashSaleCard isActive={trip.flashSale!.isActive} />
            <Box className="bg-white p-2 rounded-t-xl">
                <Box className="flex-1 flex flex-row">
                    <RouteIndicator
                        startLocation={trip.startLocation}
                        endLocation={trip.endLocation}
                        startTime={trip.startTime}
                        duration={trip.duration}
                        endTime={trip.endTime}
                    />
                    <SaleDisplay onDetailClick={() => console.log("hello")} isActive={trip.flashSale!.isActive} originPrice={trip.price} saleDetail={trip.flashSale!.saleDetail} />
                </Box>

                <Divider className="my-2" size={1} />

                <TripContent onImgClick={() => console.log("hello")} />

                <Box className="flex flex-row mt-2 items-center">
                    <div className="flex flex-wrap max-w-[170px] gap-2">
                        <LabelWithIcon icon={<Zap size={12} strokeWidth={2} fill="green" color="green" />
                        } label="Xác nhận tức thì" />
                        <LabelWithIcon icon={<WalletIcon className="text-green-400" size={12} color="green" />
                        } label="Không cần thanh toán trước" />
                        <LabelWithIcon icon={<HandshakeIcon size={12} color="green" />} label="Đón trả tận nơi" />
                    </div>
                    <div className="flex-1 text-end">
                        <Button onClick={() => console.log("hello")} className="bg-green-600" size="small">Chọn</Button>
                    </div>
                </Box>
            </Box>

            <Text className="flex-1 p-1 bg-green-100 rounded-b-xl text-xs italic text-gray-600 text-end mt-1 border border-slate-200">
                Chi tiết nhà xe, giá vé, chính sách và hoàn hủy
                <button onClick={() => { console.log("hello") }}>
                    <Icon className="ml-1 text-blue-500" size={16} icon="zi-info-circle" />
                </button>
            </Text>
        </Box >
    );
}

export default TripItem






