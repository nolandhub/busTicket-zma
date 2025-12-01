import { BookingData } from "@/types/bookingType";
import { FC } from "react";
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon";
import { formatPrice } from "@/helper/formatPrice";
import { useRecoilValue } from "recoil";
import { busCompanyState, departureDateState, selectedTripState } from "@/state";
import dayjs from "dayjs";
import { Box, Text } from "zmp-ui";
import { Clock, Ticket } from "lucide-react";
import MoreDetail from "../AvailableTrip/MoreDetails";
import useTrip from "@/hooks/useTrip";
import ImageViewerCustom from "../AvailableTrip/ImageViewer";
import { Section } from "../common/Section";

interface BookingReviewProps {
    data: BookingData;
}
const BookingReview: FC<BookingReviewProps> = ({ data }) => {
    const {
        visibleSheet, activeTabKey, activeImgKey, visibleImgView,
        setVisibleImgView, directTab, handleSelectImg,
        setVisibleSheet, setActiveTabKey
    } = useTrip();

    const options = Array.isArray(data.option) ? data.option : data.option ? [data.option] : [];
    const departDate = useRecoilValue(departureDateState);
    const busCompData = useRecoilValue(busCompanyState);
    const busCompFilter = busCompData.find(f => f.compId === data.compId);
    const tripSelected = useRecoilValue(selectedTripState);

    const InfoRow = ({ label, value }: { label: string; value: string }) => (
        <Box className="flex justify-between">
            <span className="text-gray-600">{label}:</span>
            <span className="font-medium">{value}</span>
        </Box>
    );
    return (
        <Box className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-green-600 mb-2">Thông tin đặt vé</h2>

            {/* Thông tin chuyến xe */}
            <Section title="Thông tin chuyến">
                <Box className="space-y-2 text-sm">
                    {data.routeName && <InfoRow label="Tuyến" value={data.routeName} />}
                    <InfoRow label="Tên xe" value={data.compName} />
                    <Box className="flex justify-end">
                        <span className="font-normal text-slate-500">{data.busName}</span>
                    </Box>
                    <Box className="my-2">
                        <Text bold>
                            {`${dayjs(departDate).format("dddd").charAt(0).toUpperCase() + dayjs(departDate).format("dddd").slice(1)}, ${dayjs(departDate).format("DD/MM/YYYY")}`}
                        </Text>
                    </Box>
                </Box>
                <Box className="flex mt-4 justify-between ">
                    <RouteIndicator
                        size={16}
                        onClick={() => directTab("2")}
                        startLocation={data.pickUp ? data.pickUp.title : ""}
                        subStartLocation={data.pickUp ? data.pickUp.subtitle : ""}
                        endLocation={data.dropOff?.title}
                        subEndLocation={data.dropOff?.subtitle}
                    />
                    <img
                        onClick={() => directTab("3")}
                        className="cursor-pointer border w-[140px] h-[90px] rounded-lg ml-16"
                        src={busCompFilter?.avatar || "https://picsum.photos/400/300"}
                        alt="ảnh nhà xe"
                    />
                </Box>
            </Section>

            {/* Điểm đón và trả */}
            <Section title="Điểm đón - trả">
                {data.pickUp && (
                    <Box className="mb-3 p-3 bg-green-50 rounded border">
                        <Box className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">Đón:</span>
                            <Box className="flex-1">
                                <Box className="font-medium text-sm">{data.pickUp.title}</Box>
                                <Box className="text-gray-600 text-sm">{data.pickUp.subtitle}</Box>
                            </Box>
                        </Box>
                    </Box>
                )}
                {data.dropOff && (
                    <Box className="p-3 bg-green-50 rounded border">
                        <Box className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">Trả:</span>
                            <Box className="flex-1">
                                <Box className="font-medium text-sm">{data.dropOff.title}</Box>
                                <Box className="text-gray-600 text-sm">{data.dropOff.subtitle}</Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Section>

            {/* Thông tin hành khách */}
            <Section title="Thông tin hành khách">
                <Box className="space-y-2 text-sm">
                    <InfoRow label="Họ tên" value={data.bookingName} />
                    <InfoRow label="Số điện thoại" value={data.bookingPhone} />
                </Box>
            </Section>

            {/* Chi tiết vé */}
            {options.length > 0 && (
                <Box className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
                    <Box className="flex items-center gap-2 mb-4">
                        <Ticket className="text-green-600" size={20} />
                        <h3 className="font-bold text-lg text-gray-800">Chi tiết vé</h3>
                    </Box>
                    <Box className="space-y-3">
                        {options.map((opt, index) => (
                            <Box key={index} className="bg-gradient-to-r from-green-50 to-green-20 rounded-lg p-4 border">
                                <Box className="flex justify-between mb-2">
                                    <Box className="flex-1">
                                        <Box className="font-bold text-gray-800">{opt.label}</Box>
                                        <Box className="text-md text-gray-600 mt-1">
                                            {formatPrice(opt.value)}đ × {opt.quantity} vé
                                        </Box>
                                        {opt.time && (
                                            <Box className="text-blue-600 mt-2 flex items-center gap-1">
                                                <Clock size={20} />
                                                <span className="font-bold">{opt.time}</span>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box className="text-right">
                                        <Box className="text-xs text-gray-500">Thành tiền</Box>
                                        <Box className="font-bold text-lg text-emerald-600">
                                            {formatPrice(opt.subtotal)}đ
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            <MoreDetail
                trip={tripSelected!}
                busCompany={busCompFilter}
                sheet={{ visibleSheet, setVisibleSheet }}
                tab={{ activeTabKey, setActiveTabKey }}
                handleSelectImg={handleSelectImg}
            />

            <ImageViewerCustom
                busCompany={busCompFilter}
                imageViewer={{ activeImgKey, visibleImgView, setVisibleImgView }}
            />
        </Box>
    );
};

export default BookingReview;
