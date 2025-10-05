import TripList from "@/components/AvailableTrip/TripList";
import BackHeader from "@/components/common/BackHeader";
import SearchArea from "@/components/Home/SearchArea";
import { departureDateState } from "@/state";
import { BusCompany } from "@/types/busCompanyType";
import { parseString } from "@/utils/date";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text, Page, useLocation, Modal } from "zmp-ui";

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
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fromLabel = params.get('fromLabel') || '';
    const toLabel = params.get('toLabel') || '';

    const departDate = useRecoilValue(departureDateState)

    const [open, setOpen] = useState<boolean>(false)
    const handleClick = () => {
        setOpen(true)
    }

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

            <Box className="flex-1 overflow-auto space-y-4 p-4  border-t-2 border-t-slate-300">

                <TripList />

            </Box>

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
                    <SearchArea />
                </Modal>
            }
        </Page >
    );
}




