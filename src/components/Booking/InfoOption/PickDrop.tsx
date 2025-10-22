import { FC, useEffect, useState } from "react";
import { BasePickDrop } from "@/types/tripType";
import { Box } from "zmp-ui";
import PickSelect from "./PickSelect";
import NoteInput from "./NoteInput";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookingState, priceOptionState } from "@/state";

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
    const [pickupValue, setPickupValue] = useState("");
    const [dropoffValue, setDropoffValue] = useState("");
    const [pickUpNote, setPickUpNote] = useState("");
    const [dropOffNote, setDropOffNote] = useState("");
    const [isError1, setError1] = useState<boolean>(false);
    const [isError2, setError2] = useState<boolean>(false);

    // ✅ THÊM DÒNG NÀY
    const setBooking = useSetRecoilState(bookingState);

    useEffect(() => {
        const pickup =
            pickupValue != null && pickupValue !== "999"
                ? pickUp[Number(pickupValue)] ?? null
                : pickupValue === "999"
                    ? { title: "Trung Chuyển Tận Nơi", subTitle: pickUpNote }
                    : null;

        const dropoff =
            dropoffValue != null && dropoffValue !== "1000"
                ? dropOff[Number(dropoffValue)] ?? null
                : dropoffValue === "1000"
                    ? { title: "Trung Chuyển Tận Nơi", subTitle: dropOffNote }
                    : null;

        // Validate note fields
        setError1(hasTransfer != null && (hasTransfer === "1" || hasTransfer === "3") && !pickUpNote);
        setError2(hasTransfer != null && (hasTransfer === "2" || hasTransfer === "3") && !dropOffNote);

        const ready = pickupValue !== "" || dropoffValue !== "";
        if (ready) {
            setBooking((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    pickUp: pickup,
                    dropOff: dropoff
                };
            });
        }

    }, [pickupValue, dropoffValue, pickUpNote, dropOffNote, hasTransfer, pickUp, dropOff, setBooking]);

    return (
        <div className="flex flex-col gap-4 mt-4 bg-white rounded-xl border p-4 shadow-md">
            {/* Điểm đón */}
            <PickSelect
                label="Chọn điểm đón"
                options={pickUp}
                value={pickupValue}
                onChange={setPickupValue}
                transferEnabled={hasTransfer === "1" || hasTransfer === "3"}
                transferValue="999"
                transferLabel="Trung Chuyển Tận Nơi"
            />

            {pickupValue === "999" && (
                <NoteInput
                    label="Ghi chú điểm đón"
                    value={pickUpNote}
                    onChange={setPickUpNote}
                    isError={isError1}
                />
            )}

            {/* Điểm trả */}
            <PickSelect
                label="Chọn điểm trả"
                options={dropOff}
                value={dropoffValue}
                onChange={setDropoffValue}
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
                        onChange={setDropOffNote}
                        isError={isError2}
                    />
                </Box>
            )}
        </div>
    );
};

export default PickDrop;