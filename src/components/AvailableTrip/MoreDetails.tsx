import { Box, Button, Sheet, Tabs, Text } from "zmp-ui"
import { FC } from "react"
import { BusCompany } from "@/types/busCompanyType"
import { parseString } from "@/utils/date"
import { TripWithSale } from "@/types/tripType"
import { useRecoilValue } from "recoil"
import { departureDateState } from "@/state"
import DetailPriceTab from "./TabDisplay/DetailPriceTab"
import PoliciesTab from "./TabDisplay/PoliciesTab"
import PickDropTab from "./TabDisplay/PickDropTab"

interface MoreDetailsProps {
    trip: TripWithSale;
    busCompany?: BusCompany
    sheet: {
        visibleSheet: boolean;
        setVisibleSheet: (v: boolean) => void;
    };
    tab: {
        activeTabKey: string;
        setActiveTabKey: (v: string) => void;
    };
    handleSelectImg: (idx: number) => void;
}

const MoreDetail: FC<MoreDetailsProps> = ({ busCompany, trip, sheet, tab, handleSelectImg }) => {
    const departDate = useRecoilValue(departureDateState);

    return (
        <Sheet
            mask={true}
            title="Thông tin chi tiết"
            visible={sheet.visibleSheet}
            onClose={() => sheet.setVisibleSheet(false)}
        >
            <Box className="custom-bottom-sheet" flex flexDirection="column" p={2}>
                <Box className="flex gap-2 items-start">
                    <img
                        alt="Hình ảnh minh họa"
                        src={busCompany?.avatar ? busCompany.avatar : "https://picsum.photos/200/300"}
                        style={{ borderRadius: "10px", width: "40%", height: "120px" }}
                    />
                    <div>
                        <Text className="font-bold text-lg">{trip.compName}</Text>
                        <Text className="font-medium text-md text-gray-600">{trip.busName}</Text>
                        <div className="mt-2">
                            <Text className="text-gray-700 font-medium text-md">
                                Ngày: {parseString(departDate)}
                            </Text>
                        </div>
                    </div>
                </Box>

                <Box className="bottom-sheet-body h-[360px]" style={{ overflowY: "auto" }}>
                    <Tabs
                        scrollable
                        activeKey={tab.activeTabKey}
                        defaultActiveKey="3"
                        onChange={(key) => tab.setActiveTabKey(key)}
                    >
                        <Tabs.Tab key="1" label="Chi tiết giá">
                            <Box p={4}>
                                <DetailPriceTab
                                    price={trip.price}
                                    priceType={trip.priceType}
                                    snapShotSale={trip.saleSnapShot}
                                />
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="2" label="Đón/Trả">
                            <Box p={4}>
                                <PickDropTab hasTransfer={trip.transferType || null} pickUp={trip.pickUp ? trip.pickUp : []} dropOff={trip.dropOff ? trip.dropOff : []} />
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="3" label="Hình ảnh">
                            <Box className="overflow-auto" p={4}>
                                {
                                    busCompany?.imagesInterior ?
                                        <Box className="grid grid-cols-3 gap-2">
                                            {
                                                busCompany?.imagesInterior.map((src, idx) => (
                                                    <img
                                                        key={idx}
                                                        className="aspect-square rounded-lg shadow-sm cursor-pointer"
                                                        src={src}
                                                        onClick={() => handleSelectImg(idx)}
                                                    />
                                                ))
                                            }
                                        </Box>
                                        : "Chưa cập nhật hình ảnh"
                                }
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="4" label="Chính sách">
                            <Box p={4}>
                                {busCompany?.policies ?
                                    <PoliciesTab policies={busCompany.policies} />
                                    : "Chưa cập nhật chính sách"
                                }

                            </Box>
                        </Tabs.Tab>
                    </Tabs>
                </Box>

                <Box className="flex justify-end">
                    <Button
                        onClick={() => sheet.setVisibleSheet(false)}
                        variant="secondary"
                        size="small"
                    >
                        Đóng
                    </Button>
                </Box>
            </Box>
        </Sheet>
    );
};

export default MoreDetail;

