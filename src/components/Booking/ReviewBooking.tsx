import { BookingData } from "@/types/bookingType";
import { FC } from "react";
import RouteIndicator from "../AvailableTrip/RouteIndicatorIcon";
import { formatPrice } from "@/helper/formatPrice";
import { useRecoilValue } from "recoil";
import { busCompanyState, departureDateState } from "@/state";
import dayjs from "dayjs";
import { Text } from "zmp-ui";
import { Clock, Ticket } from "lucide-react";

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
                <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-4">
                        <Ticket className="text-green-600" size={20} />
                        <h3 className="font-bold text-lg text-gray-800">Chi tiết vé</h3>
                    </div>

                    <div className="space-y-3">
                        {options.map((opt, index) => (
                            <div key={index} className="bg-gradient-to-r from-green-50 to-green-20 rounded-lg p-4 border ">
                                <div className="flex justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-800">{opt.label}</div>
                                        <div className="text-md text-gray-600 mt-1">
                                            {formatPrice(opt.value)}đ × {opt.quantity} vé
                                        </div>
                                        {opt.time && (
                                            <div className=" text-blue-600 mt-2 flex items-center gap-1">
                                                <span><Clock size={20} /></span>
                                                <span className="font-bold">{opt.time}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Thành tiền</div>
                                        <div className="font-bold text-lg text-emerald-600">
                                            {formatPrice(opt.subtotal)}đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookingReview
