import { parseString } from "@/utils/date";
import { DatePicker, Box, Switch } from "zmp-ui";

interface Props {
    value: Date;
    onChange: (date: Date) => void;
    onSwitch: () => void
    isReturn: boolean
}

const DateInput = ({ value, onChange, onSwitch, isReturn }: Props) => {
    return (
        <Box className="flex flex-col items-start">
            <Box className="flex justify-between items-center w-full">
                <Box className="w-[200px] pl-7">
                    <DatePicker startDate={new Date()} value={value} placeholder={parseString(value)} onChange={onChange} />
                </Box>

                <Switch
                    checked={isReturn}
                    onChange={onSwitch}
                    label="Khứ hồi"
                />
            </Box>
        </Box>
    );
};

export default DateInput;
