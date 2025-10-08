import { availableTrip } from "@/state";
import { useRecoilValue } from "recoil";
import TripItem from "./TripItem";

export default function TripList() {
    const trips = useRecoilValue(availableTrip)
    return (
        <>
            {
                trips.length > 0 ? (
                    trips.map((t, idx) => <TripItem key={idx} trip={t} />)
                ) : (
                    <div>Không tìm thấy chuyến nào.....</div>
                )
            }
        </>
    )
}

