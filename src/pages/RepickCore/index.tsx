import CalendarCell from "@/components/RepickCore/CalendarCell";
import ShowDateRange from "@/components/RepickCore/ShowDateRange";
import ShowDateStartEnd from "@/components/RepickCore/ShowDateStartEnd";
import useCoreInit from "@/hooks/useCoreInit";
import useRepickCore from "@/hooks/useRepickCore";
import { Box, Button, Calendar, Header, Page, Switch, Text } from "zmp-ui";

export default function RepickCore() {
    const { returnDate, isReturn, departDate } = useCoreInit()
    const { handleBack, handleChange, handleClick, handleLogicDate, open } = useRepickCore()

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

                <ShowDateStartEnd departDate={departDate} returnDate={returnDate} />

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
                    fullCellRender={(date, info) => (
                        < CalendarCell
                            date={date}
                            info={info}
                            departDate={departDate}
                            returnDate={returnDate}
                        />
                    )}
                />

                {returnDate && (
                    <ShowDateRange departDate={departDate} returnDate={returnDate} />
                )}

                <Box className="mt-4 p-4">
                    <Button disabled={open} fullWidth onClick={handleClick} className="font-bold text-lg text-center"> Xác Nhận</Button>
                </Box>

            </Box>
        </Page>
    );
}

