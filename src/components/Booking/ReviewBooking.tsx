import { BookingData } from "@/types/bookingType";
import { FC } from "react";
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon";
import { formatPrice } from "@/helper/formatPrice";
import { useRecoilValue } from "recoil";
import { busCompanyState, departureDateState } from "@/state";
import dayjs from "dayjs";
import { Text } from "zmp-ui";

interface BookingReviewProps {
    data: BookingData;
}

const BookingReview: FC<BookingReviewProps> = ({ data }) => {
    const options = Array.isArray(data.option) ? data.option : data.option ? [data.option] : [];
    const departDate = useRecoilValue(departureDateState)
    const busCompData = useRecoilValue(busCompanyState)
    const busCompFilter = busCompData.find(f => f.compId === data.compId);

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold text-green-600 mb-2">Thông tin đặt vé</h2>
            {/* Thông tin chuyến xe */}
            <div className="mb-4 pb-4 border-b">
                <h3 className="font-bold text-sm text-gray-700 mb-2">Thông tin chuyến</h3>
                <div className="space-y-2 text-sm">
                    {data.tripName && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tuyến:</span>
                            <span className="font-medium">{data.tripName}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span className="text-gray-600">Tên xe:</span>
                        <span className="font-medium">{data.compName}</span>
                    </div>
                    <div className="flex justify-end">
                        <span className="font-normal text-slate-500">{data.busName}</span>
                    </div>

                    <div className="my-2">
                        <Text bold>
                            {`${dayjs(departDate).format("dddd").charAt(0).toUpperCase() + dayjs(departDate).format("dddd").slice(1)}, ${dayjs(departDate).format("DD/MM/YYYY")}`}
                        </Text>
                    </div>
                </div>

                <div className="flex mt-4">
                    {data &&
                        <RouteIndicator
                            startLocation={data.pickUp?.subTitle}
                            endLocation={data.dropOff?.subTitle}
                        />}
                    <img className="border w-[140px] h-[90px] rounded-lg ml-16" src={busCompFilter?.avatar} alt="ảnh nhà xe" />
                </div>
            </div>

            {/* Điểm đón và trả */}
            <div className="mb-4 pb-4 border-b">
                <h3 className="font-bold text-sm text-gray-700 mb-2">Điểm đón - trả</h3>
                {data.pickUp && (
                    <div className="mb-3 p-3 bg-green-50 rounded border">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">Đón:</span>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{data.pickUp.title}</div>
                                <div className="text-gray-600 text-sm">{data.pickUp.subTitle}</div>
                            </div>
                        </div>
                    </div>
                )}
                {data.dropOff && (
                    <div className="p-3 bg-green-50 rounded border">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">Trả:</span>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{data.dropOff.title}</div>
                                <div className="text-gray-600 text-sm">{data.dropOff.subTitle}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Thông tin hành khách */}
            <div className="mb-4 pb-4 border-b">
                <h3 className="font-bold text-sm text-gray-700 mb-2">Thông tin hành khách</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="font-medium">{data.bookingName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Số điện thoại:</span>
                        <span className="font-medium">{data.bookingPhone}</span>
                    </div>
                </div>
            </div>

            {/* Tùy chọn vé */}
            {options.length > 0 && (
                <div className="mb-4 pb-4 border-b">
                    <h3 className="font-bold text-sm text-gray-700 mb-2">Chi tiết vé</h3>
                    <div className="space-y-2">
                        {options.map((opt, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <div>
                                    <span className="font-medium">{opt.label}</span>
                                    <span className="text-gray-600 ml-2">x{opt.passCount}</span>
                                </div>
                                <span className="font-medium">{formatPrice(opt.totalOptionPrice)}đ</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tổng tiền */}
            <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Tổng tiền:</span>
                <span className="font-bold text-xl text-green-600">{formatPrice(data.total)}đ</span>
            </div>
        </div>
    );
};

export default BookingReview