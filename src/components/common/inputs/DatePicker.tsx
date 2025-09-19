import { DatePicker, Box, Icon } from "zmp-ui";
interface Props {
    value?: Date;
    onChange?: (date: Date) => void;
    placeholder?: string;
}

const DateInput = ({ value, placeholder, onChange }: Props) => {
    return (
        <Box className="flex w-full h-full space-x-1 items-center justify-center">
            <Icon
                icon="zi-calendar"
                size={24}
                className="text-indigo-700 font-semibold"
            />
            <DatePicker
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </Box>
    );
};

export default DateInput;

