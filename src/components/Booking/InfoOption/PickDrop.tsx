import { FC, useEffect, useState } from "react";
import { BasePickDrop } from "@/types/tripType";
import { Box } from "zmp-ui";
import PickSelect from "./PickSelect";
import NoteInput from "./NoteInput";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookingState } from "@/state";

interface PickDropProps {
    hasTransfer?: string | null;
    pickUp: BasePickDrop[];
    dropOff: BasePickDrop[];
}

const PickDrop: FC<PickDropProps> = ({
    pickUp,
    dropOff,
    hasTransfer,
}) => {

    const [dataBooking, setBooking] = useRecoilState(bookingState)
    const pickupValue = dataBooking.pickUpValue ?? ""
    const dropoffValue = dataBooking.dropOffValue ?? ""
    const pickUpNote = dataBooking.pickUpNote ?? ""
    const dropOffNote = dataBooking.dropOffNote ?? ""

    useEffect(() => {
        if (!pickupValue && !dropoffValue) return; // Không làm gì nếu chưa chọn

        const pickup =
            pickupValue && pickupValue !== "999"
                ? pickUp[Number(pickupValue)] ?? null
                : pickupValue === "999"
                    ? { title: "Trung Chuyển Tận Nơi", subTitle: pickUpNote }
                    : null;

        const dropoff =
            dropoffValue && dropoffValue !== "1000"
                ? dropOff[Number(dropoffValue)] ?? null
                : dropoffValue === "1000"
                    ? { title: "Trung Chuyển Tận Nơi", subTitle: dropOffNote }
                    : null;

        setBooking((prev) => ({
            ...prev,
            pickUp: pickup,
            dropOff: dropoff
        }));

    }, [pickupValue, dropoffValue, pickUpNote, dropOffNote]);

    return (
        <div className="flex flex-col gap-4 mt-4 bg-white rounded-xl border p-4 shadow-md">
            {/* Điểm đón */}
            <PickSelect
                label="Chọn điểm đón"
                options={pickUp}
                value={pickupValue}
                onChange={(val) => setBooking(prev => ({ ...prev, pickUpValue: val }))}
                transferEnabled={hasTransfer === "1" || hasTransfer === "3"}
                transferValue="999"
                transferLabel="Trung Chuyển Tận Nơi"
            />

            {pickupValue === "999" && (
                <NoteInput
                    label="Ghi chú điểm đón"
                    value={pickUpNote}
                    onChange={(val) => setBooking(prev => ({ ...prev, pickUpNote: val }))}
                />
            )}

            {/* Điểm trả */}
            <PickSelect
                label="Chọn điểm trả"
                options={dropOff}
                value={dropoffValue}
                onChange={(val) => setBooking(prev => ({ ...prev, dropOffValue: val }))}
                transferEnabled={hasTransfer === "2" || hasTransfer === "3"}
                transferValue="1000"
                transferLabel="Trung Chuyển Tận Nơi"
                titleFormat={(item) => `${item.subTitle} — ${item.title}`}
            />
            {dropoffValue === "1000" && (
                <Box>
                    <NoteInput
                        label="Ghi chú điểm trả"
                        value={dropOffNote}
                        onChange={(val) => setBooking(prev => ({ ...prev, dropOffNote: val }))}
                    />
                </Box>
            )}
        </div>
    );
};

export default PickDrop;


