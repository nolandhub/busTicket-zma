import { FC } from "react";
import { Select } from "zmp-ui";
import { BasePickDrop } from "@/types/tripType";

interface PickSelectProps {
    label: string;
    options: BasePickDrop[];
    value: number | null;
    onChange: (value: number) => void;
    transferEnabled?: boolean;
    transferValue: number;
    transferLabel: string;
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
    titleFormat = (item) => `${item.title} - ${item.subtitle}`,
}) => {
    return (
        <Select
            defaultValue={-1}
            label={label}
            placeholder={label}
            value={value ? value : 0}
            onChange={(val) => onChange(val as number)}
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
