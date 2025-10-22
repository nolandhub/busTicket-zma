import { Box, Button, Icon, Text } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";
import { Zap, WalletIcon, HandshakeIcon } from "lucide-react";
import { Divider } from "../common/Divider";
import LabelWithIcon from "./PoliciesWithIcon";
import { TripFiltered } from "@/types/tripType";
import FlashSaleCard from "./FlashSaleCard";
import TripContent from "./TripContent";
import { FC } from "react";
import PriceDisplay from "./PriceDisplay";
import useTrip from "@/hooks/useTrip";
import MoreDetail from "./MoreDetails";
import ImageViewerCustom from "./ImageViewer";
import { useRecoilValue } from "recoil";
import { busCompanyState } from "@/state";

const TripItem: FC<{ trip: TripFiltered }> = ({ trip }) => {
    const {
        visibleSheet,
        activeTabKey,
        activeImgKey,
        visibleImgView,
        setVisibleImgView,
        directTab,
        handleSelectImg,
        setVisibleSheet,
        setActiveTabKey,
        handleSelectTrip
    } = useTrip()

    if (trip.isDelete == true) {
        return null
    }

    const busCompData = useRecoilValue(busCompanyState)

    const busCompFilter = busCompData.find(f => f.compId === trip.compId);

    return (
        <Box className="bg-white rounded-xl border border-slate-300 md:max-w-lg mx-auto shadow-lg">
            <FlashSaleCard snapShotSale={trip.snapShotSale} />
            <Box className="bg-white p-2 rounded-t-xl">
                <Box className="flex-1 flex flex-row">
                    <RouteIndicator
                        startLocation={trip.activePickDrop.startLocation}
                        endLocation={trip.activePickDrop.endLocation}
                        // startTime={trip.activePickDrop.startTime}
                        // duration={trip.activePickDrop.duration}
                        // endTime={trip.activePickDrop.endTime}
                        onClick={() => directTab("2")}
                    />
                    <PriceDisplay
                        price={trip.price}
                        snapShotSale={trip.snapShotSale}
                        salePrice={trip.salePrice}
                        onDetailClick={() => directTab("1")}  /* setVisible(true) */
                    />
                </Box>

                <Divider className="my-2" size={1} />

                <TripContent avatar={busCompFilter?.avatar} busName={trip.busName} compName={trip.compName} onImgClick={() => directTab("3")} />

                <Box className="flex flex-row mt-2 items-center cursor-pointer">
                    <Box onClick={() => directTab("4")} className="flex flex-wrap max-w-[170px] gap-2">
                        <LabelWithIcon icon={<Zap size={12} strokeWidth={2} fill="green" color="green" />
                        } label="Xác nhận tức thì" />
                        <LabelWithIcon icon={<WalletIcon className="text-green-400" size={12} color="green" />
                        } label="Không cần thanh toán trước" />
                        <LabelWithIcon icon={<HandshakeIcon size={12} color="green" />} label="Đón trả tận nơi" />
                    </Box>
                    <div className="flex-1 text-end">
                        <Button onClick={() => handleSelectTrip(trip)} size="medium">Chọn</Button>
                    </div>
                </Box>
            </Box>

            <Text className="flex-1 p-1 bg-green-100 rounded-b-xl text-xs italic text-gray-600 text-end mt-1 border border-slate-200">
                Chi tiết nhà xe, giá vé, chính sách và hoàn hủy
                <button onClick={() => directTab("4")}>
                    <Icon className="ml-1 text-blue-500" size={16} icon="zi-info-circle" />
                </button>
            </Text>
            {
                <MoreDetail trip={trip} busCompany={busCompFilter} sheet={{ visibleSheet, setVisibleSheet }} tab={{ activeTabKey, setActiveTabKey }} handleSelectImg={handleSelectImg} />
            }
            {
                <ImageViewerCustom
                    busCompany={busCompFilter}
                    imageViewer={{ activeImgKey, visibleImgView, setVisibleImgView }}
                />
            }
        </Box >
    );
}


export default TripItem






