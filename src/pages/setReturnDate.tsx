import useSearch from "@/hooks/useSearch";
import { departureDateState, isReturnState, returnDateState } from "@/state";
import { parseString } from "@/utils/date";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Button, Calendar, Header, Page, Switch, Text, useNavigate } from "zmp-ui";

export default function SetDate() {
    const navigate = useNavigate()
    const departDate = useRecoilValue(departureDateState);
    const returnDate = useRecoilValue(returnDateState);
    const isReturn = useRecoilValue(isReturnState);
    const { setReturnDate, setIsReturn } = useSearch();
    const resetReturnDate = useResetRecoilState(returnDateState);

    const RenderFullCell = (date: Date, info: any) => {
        // Nếu không phải đang ở panel ngày thì trả về originNode gốc
        if (info?.type !== "date") {
            return info.originNode || null;
        }

        const d = date.toDateString();
        const dateNumber = date.getDate();

        if (d === departDate.toDateString()) {
            return (
                <div className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </div>
            );
        }

        if (returnDate && d === returnDate.toDateString()) {
            return (
                <div className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </div>
            );
        }

        if (returnDate && date > departDate && date < returnDate) {
            return (
                <div className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </div>
            );
        }

        return (
            <div className="w-8 h-8 flex items-center justify-center">
                {dateNumber}
            </div>
        );
    };


    const handleChange = () => {
        setIsReturn(!isReturn)
    }

    const handleBack = () => {
        if (isReturn || returnDate) {
            resetReturnDate()
            setIsReturn(false)
            navigate("/")
        }
        resetReturnDate
        setIsReturn(false)
        navigate("/")
    }
    const handleClick = () => {
        resetReturnDate()
        navigate("/")

    }

    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <Header
                title="Chọn ngày"
                showBackIcon
                onBackClick={handleBack}
                backgroundColor="#FFE065"
            />

            <Box className="flex-1 overflow-auto w-full p-6">
                <div className="flex justify-between pb-4 p-2">
                    <Text bold className="text-gray-500">Thay đổi</Text>
                    <Switch onChange={handleChange} checked={isReturn} size="medium" label="Khứ hồi" />
                </div>

                <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-around items-center">
                        <div className="text-xl">
                            <span className="text-gray-500">Ngày đi:</span>
                            <div className="font-medium text-blue-600">
                                {parseString(departDate)}
                            </div>
                        </div>
                        <div className="text-gray-400 text-4xl">→</div>
                        <div className="text-xl">
                            <span className="text-gray-500">Ngày về:</span>
                            <div className="font-medium text-blue-600">
                                {returnDate ? parseString(returnDate) : 'Chưa chọn'}
                            </div>
                        </div>
                    </div>
                </div>

                <Calendar
                    disabledDate={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date < departDate;
                    }}
                    onSelect={(date, info) => {
                        if (info?.source === "date") {
                            setReturnDate(date);
                        }
                    }}
                    fullCellRender={RenderFullCell}
                />

                {returnDate && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-green-800 font-medium">
                            Đã chọn khoảng thời gian:
                        </div>
                        <div className="text-green-600 text-sm mt-1">
                            {Math.ceil((returnDate.getTime() - departDate.getTime()) / (1000 * 60 * 60 * 24))} ngày
                        </div>
                    </div>
                )}

                <Box className="mt-4 p-4">
                    <Button fullWidth size="large" onClick={handleClick} disabled={isReturn} className=" font-bold text-lg text-center"> Xác Nhận</Button>
                </Box>

            </Box>
        </Page>
    );
}
