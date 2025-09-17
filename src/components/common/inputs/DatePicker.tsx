import { DatePicker } from "zmp-ui";

interface Props {
    value?: Date | undefined;
    onChange?: (date: Date) => void;
    placeholder?: string;

}

const DateInput = ({ value, placeholder, onChange }: Props) => {
    return (
        <div className="w-full sm:flex-[1.2] sm:px-3">
            <div
                className="w-full min-w-[175px] px-4 py-3 outline outline-1 outline-gray-300 
        focus-within:outline-blue-400 rounded-3xl bg-white flex items-center "
            >
                <DatePicker
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />

            </div>
        </div>
    );
};

export default DateInput;
