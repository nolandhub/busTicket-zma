import { tripState } from "@/state";
import { useRecoilValue } from "recoil";
import TripItem from "./tripItem";

export default function TripList() {
    const trips = useRecoilValue(tripState)

    if (trips.length == 0) {
        return (
            <>
                <div className="text-red-600">Hiện tại, chúng tôi chưa khai thác chuyến này.....</div>
                <div className="text-red-600">Cảm ơn bạn đã quan tâm! &lt;3</div>
            </>
        )
    }

    return (
        <>
            {
                trips.length > 0 && (
                    trips.map((t, idx) => <TripItem key={idx} trip={t} />)
                )
            }
        </>
    )
}

