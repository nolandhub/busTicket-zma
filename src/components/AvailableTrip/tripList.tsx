import { availableTrip, tripState } from "@/state";
import { useRecoilValue } from "recoil";
import TripItem from "./tripItem";

export default function TripList() {
    const tripsFilter = useRecoilValue(availableTrip)
    const tripGetAll = useRecoilValue(tripState)

    if (tripGetAll.length == 0) {
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
                tripsFilter.length > 0 ? (
                    tripsFilter.map((t, idx) => <TripItem key={idx} trip={t} />)
                ) : (
                    <div className="text-red-600">Chuyến này hôm nay đã hết, vui lòng chọn sang ngày khác. Xin Cảm ơn !!</div>
                )
            }
        </>
    )
}

