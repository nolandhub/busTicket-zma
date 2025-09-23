import useCoreInit from "@/hooks/useCoreInit";
import useSetReturn from "@/hooks/useSetReturn";
import { parseString } from "@/utils/date";
import { getRangeDays } from "@/utils/date";
import { Box, Button, Calendar, Header, Page, Switch, Text } from "zmp-ui";

export default function SetDate() {

    const { returnDate, isReturn, departDate } = useCoreInit()
    const { handleBack, handleChange, handleClick, handleLogicDate, open } = useSetReturn()



    const RenderFullCell = (date: Date, info: any) => {
        // return Origin_node (default UI-zmp) if !date
        if (info?.type !== "date") {
            return info.originNode || null;
        }

        const d = date.toDateString();
        const dateNumber = date.getDate();

        //start date
        if (d === departDate.toDateString()) {
            return (
                <Box className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </Box>
            );
        }

        //end date
        if (returnDate && d === returnDate.toDateString()) {
            return (
                <Box className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </Box>
            );
        }
        //between (start;end)
        if (returnDate && date > departDate && date < returnDate) {
            return (
                <Box className="w-8 h-8 flex items-center justify-center relative">
                    <div className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                        {dateNumber}
                    </div>
                </Box>
            );
        }

        return (
            <Box className="w-8 h-8 flex items-center justify-center">
                {dateNumber}
            </Box>
        );
    };



    return (
        <Page className="flex-1 flex flex-col bg-slate-100">
            <Header
                title="Chọn ngày"
                showBackIcon
                onBackClick={handleBack}
                backgroundColor="#FFE065"
            />

            <Box className="flex-1 overflow-auto w-full p-6">
                <Box className="flex justify-between pb-4 p-2">
                    <Text bold className="text-gray-500">Thay đổi</Text>
                    <Switch onChange={handleChange} checked={isReturn} size="medium" label="Khứ hồi" />
                </Box>

                <Box className="mb-4 p-4 bg-white rounded-lg shadow-sm">
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
                </Box>

                <Calendar
                    disabledDate={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                    }}
                    onSelect={(date, info) => {
                        if (info?.source === "date") {
                            handleLogicDate(date)
                        }
                    }}
                    fullCellRender={RenderFullCell}
                />

                {returnDate && (
                    <Box className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-green-800 font-medium">
                            Đã chọn khoảng thời gian:
                        </div>
                        <div className="text-green-600 text-sm mt-1">
                            {getRangeDays(departDate, returnDate)} ngày
                        </div>
                    </Box>
                )}

                <Box className="mt-4 p-4">
                    <Button disabled={open} fullWidth size="large" onClick={handleClick} className=" font-bold text-lg text-center"> Xác Nhận</Button>
                </Box>

            </Box>
        </Page>
    );
}

