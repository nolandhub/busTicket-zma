import { FC } from "react";
import { Box, Input } from "zmp-ui";

const { TextArea } = Input;

interface NoteInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    isError?: boolean;
}

const NoteInput: FC<NoteInputProps> = ({ label, value, onChange, isError }) => {
    return (
        <Box>
            <TextArea
                status={isError ? "error" : ""}
                errorText="Vui lòng không bỏ trống nội dung."
                maxLength={50}
                showCount
                size="small"
                label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    );
};

export default NoteInput;
