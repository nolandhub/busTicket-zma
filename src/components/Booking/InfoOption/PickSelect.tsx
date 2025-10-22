import { FC } from "react";
import { Select } from "zmp-ui";
import { BasePickDrop } from "@/types/tripType";

interface PickSelectProps {
    label: string;
    options: BasePickDrop[];
    value: string;
    onChange: (value: string) => void;
    transferEnabled?: boolean;
    transferValue?: string;
    transferLabel?: string;
    titleFormat?: (item: BasePickDrop) => string;
}

const PickSelect: FC<PickSelectProps> = ({
    label,
    options,
    value,
    onChange,
    transferEnabled = false,
    transferValue,
    transferLabel,
    titleFormat = (item) => `${item.title} - ${item.subTitle}`,
}) => {
    return (
        <Select
            defaultValue={-1}
            label={label}
            placeholder={label}
            value={value}
            onChange={(val) => onChange(val as string)}
            closeOnSelect
        >
            {options.map((item, index) => (
                <Select.Option
                    key={index}
                    value={String(index)}
                    title={titleFormat(item)}
                />
            ))}
            {transferEnabled && transferValue && transferLabel && (
                <Select.Option title={transferLabel} value={transferValue} />
            )}
        </Select>
    );
};

export default PickSelect;
