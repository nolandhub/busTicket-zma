import TripItem from "@/components/AvailableTrip/TripItem"
import BackHeader from "@/components/common/BackHeader";
import SearchArea from "@/components/Home/SearchArea";
import { departureDateState, routeIdState, tripAvailable } from "@/state";
import { BusCompany } from "@/types/busCompanyType";
import { Trip } from "@/types/tripType";
import { parseString } from "@/utils/date";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text, Page, useLocation, Modal } from "zmp-ui";




export const tripMock: Trip =
{
    routeId: "saigon-hanoi",
    compId: "cuctung",
    compName: "Cúc Tùng Limousine",
    busName: "Limousine 20 Phòng Đôi VIP",
    typePrice: "byRoom",
    price: [ // 2 mức giá theo loại phòng
        { label: "Phòng đơn", value: 600000 },
        { label: "Phòng đôi", value: 800000 },
    ],
    flashSale: {
        saleDetail: {
            type: "fixed",
            value: 20000,  // giảm 20%
            finalPrice: [ // giá sau giảm
                { label: "Phòng đơn", value: 480000 },
                { label: "Phòng đôi", value: 640000 }
            ],
        },
        endTime: "2025-10-03 15:13:00",
        isActive: true,
    },
    startLocation: "Bến xe Miền Đông, TP.HCM",
    endLocation: "Bến xe Giáp Bát, Hà Nội",
    startTime: "08:00",
    duration: "22h 30p",
    endTime: "06:30",
    pickUp: [
        { title: "Bến xe Miền Tây", subTitle: "Q. Bình Tân, TP.HCM", time: "21:30" },
        { title: "Bến xe An Sương", subTitle: "QL22, Q.12, TP.HCM", time: "22:00" },
        { title: "Văn phòng Quận 1", subTitle: "268 Trần Hưng Đạo, Q.1, TP.HCM", time: "22:20" },
        { title: "Ngã tư Thủ Đức", subTitle: "Xa lộ Hà Nội, TP. Thủ Đức", time: "22:40" },
        { title: "Ngã ba Dầu Giây", subTitle: "QL20, Đồng Nai", time: "23:30" },
        { title: "Ngã ba Tân Phú", subTitle: "QL20, Đồng Nai", time: "00:10" },
        { title: "Chợ Bảo Lộc", subTitle: "TP. Bảo Lộc, Lâm Đồng", time: "02:30" },
    ],
    dropOff: [
        { title: "Bến xe Đà Lạt", subTitle: "TP. Đà Lạt", time: "06:30" },
        { title: "Trung tâm Hòa Bình", subTitle: "Phường 1, TP. Đà Lạt", time: "06:45" },
        { title: "Khách sạn Sài Gòn – Đà Lạt", subTitle: "Phường 3, TP. Đà Lạt", time: "07:00" },
        { title: "Ngã ba Phan Chu Trinh", subTitle: "Phường 9, TP. Đà Lạt", time: "07:10" },
        { title: "Bệnh viện Đa khoa Lâm Đồng", subTitle: "Phường 6, TP. Đà Lạt", time: "07:20" },
        { title: "Trường Đại học Đà Lạt", subTitle: "Phường 8, TP. Đà Lạt", time: "07:30" },
        { title: "Thiền viện Trúc Lâm", subTitle: "Phường 3, TP. Đà Lạt", time: "07:45" },
    ],
    isDelete: false
}




export const busCompanyMock: BusCompany = {
    compId: "cuctung",
    compName: "Cúc Tùng Limousine",
    avatar: "https://picsum.photos/200/200", // logo hoặc avatar công ty
    imagesInterior: [
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/300/200",
    ],
    policies: [
        {
            title: "Chính sách hoàn huỷ",
            description: [
                "Hoàn 100% nếu huỷ trước 24h.",
                "Hoàn 50% nếu huỷ trong vòng 12h.",
                "Không hoàn lại nếu huỷ sau 12h trước giờ khởi hành."
            ]
        },
        {
            title: "Chính sách hành lý",
            description: [
                "Mỗi khách được mang 1 kiện hành lý tối đa 15kg.",
                "Hành lý quá cước sẽ tính phí thêm theo quy định."
            ]
        },
        {
            title: "Chính sách trên xe",
            description: [
                "Không hút thuốc, không sử dụng chất kích thích.",
                "Giữ vệ sinh chung, không mang đồ ăn có mùi nặng.",
                "Tuân thủ hướng dẫn của tài xế và nhân viên phục vụ."
            ]
        }
    ]
}




export default function AvailableTrip() {
    // seedTrip()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fromLabel = params.get('fromLabel') || '';
    const toLabel = params.get('toLabel') || '';

    const departDate = useRecoilValue(departureDateState)

    const [open, setOpen] = useState<boolean>(false)


    const handleClick = () => {
        setOpen(true)
    }

    const tripData = useRecoilValue(tripAvailable);


    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <BackHeader
                title={
                    <Box className="flex justify-between">
                        <div className="flex flex-col">
                            <Text.Title>{fromLabel} - {toLabel}</Text.Title>
                            <Text bold size="xLarge" className=" text-gray-600">{parseString(departDate)}</Text>
                        </div>

                        <Text onClick={handleClick} className="cursor-pointer mt-8 underline underline-offset-2">
                            Thay đổi
                        </Text>
                    </Box>
                }
            />
            {
                <Modal
                    actions={[
                        {
                            close: true,
                            highLight: true,
                            text: 'Đóng'
                        }
                    ]}
                    onClose={() => setOpen(false)}
                    visible={open}
                >
                    <SearchArea /> {/* Search Area */}
                </Modal>
            }

            <Box className="flex-1 overflow-auto space-y-4 p-4  border-t-2 border-t-slate-300">

                {
                    tripData.map((t, idx) => (<TripItem key={idx} trip={t} />
                    ))
                }
            </Box>
        </Page >

    );

}




