import { Box, Button, Sheet, Tabs, Text } from "zmp-ui"
import { FC } from "react"
import { BusCompany } from "@/types/busCompanyType"
import { parseString } from "@/utils/date"
import { TripFiltered } from "@/types/tripType"
import { useRecoilValue } from "recoil"
import { departureDateState } from "@/state"
import DetailPriceTab from "./TabDisplay/DetailPriceTab"
import PoliciesTab from "./TabDisplay/PoliciesTab"
import PickDropTab from "./TabDisplay/PickDropTab"

interface MoreDetailsProps {
    trip: TripFiltered;
    busCompany: BusCompany;
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
            title="Thông tin chi tiết"
            visible={sheet.visibleSheet}
            onClose={() => sheet.setVisibleSheet(false)}
        >
            <Box className="custom-bottom-sheet" flex flexDirection="column" p={2}>
                <Box className="flex gap-2 items-start">
                    <img
                        alt="Hình ảnh minh họa"
                        src={busCompany.avatar}
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
                                <DetailPriceTab price={trip.price} typePrice={trip.typePrice} flashSale={trip.flashSale} />
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="2" label="Đón/Trả">
                            <Box p={4}>
                                <PickDropTab pickUp={trip.activePickDrop.pickUp} dropOff={trip.activePickDrop.dropOff} />
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="3" label="Hình ảnh">
                            <Box className="overflow-auto" p={4}>
                                <Box className="grid grid-cols-3 gap-2">
                                    {busCompany.imagesInterior.map((src, idx) => (
                                        <img
                                            key={idx}
                                            className="aspect-square rounded-lg shadow-sm cursor-pointer"
                                            src={src}
                                            onClick={() => handleSelectImg(idx)}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Tabs.Tab>
                        <Tabs.Tab key="4" label="Chính sách">
                            <Box p={4}>
                                <PoliciesTab policies={busCompany.policies} />
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
