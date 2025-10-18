import { BasePickDrop } from "@/types/tripType";
import { FC, useState, useEffect } from "react";
import { Select } from "zmp-ui";


interface PickDropProps {
    pickUp: BasePickDrop[];
    dropOff: BasePickDrop[];
    onSelectionChange?: (
        pickup: BasePickDrop | null,
        dropoff: BasePickDrop | null
    ) => void;
}

const PickDrop: FC<PickDropProps> = ({ pickUp, dropOff, onSelectionChange }) => {
    const [pickupValue, setPickupValue] = useState<string>("");
    const [dropoffValue, setDropoffValue] = useState<string>("");

    useEffect(() => {
        const pickup =
            pickupValue !== "" ? pickUp[Number(pickupValue)] ?? null : null;
        const dropoff =
            dropoffValue !== "" ? dropOff[Number(dropoffValue)] ?? null : null;

        onSelectionChange?.(pickup, dropoff);
    }, [pickupValue, dropoffValue]);

    return (
        <div className="flex flex-col gap-4 mt-4 bg-white rounded-xl border p-4 shadow-md ">
            {/* Chọn điểm đón */}
            <Select
                label="Chọn điểm đón"
                placeholder="Chọn điểm đón"
                value={pickupValue}
                onChange={(val) => setPickupValue(val as string)}
                closeOnSelect
            >
                {pickUp.map((item, index) => (
                    <Select.Option
                        key={index}
                        title={`${item.subTitle} — ${item.title}`}
                        value={String(index)}
                    />
                ))}
            </Select>

            {/* Chọn điểm trả */}
            <Select
                label="Chọn điểm trả"
                placeholder="Chọn điểm trả"
                value={dropoffValue}
                onChange={(val) => setDropoffValue(val as string)}
                closeOnSelect
            >
                {dropOff.map((item, index) => (
                    <Select.Option
                        key={index}
                        title={`${item.subTitle} — ${item.title}`}
                        value={String(index)}
                    />
                ))}
            </Select>
        </div>
    );
};

export default PickDrop;
