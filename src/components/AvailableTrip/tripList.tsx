import { tripAvailable } from "@/state";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import TripItem from "./TripItem";
import { Suspense } from "react";


export default function TripList() {
    return (
        <Suspense fallback={
            <Box className="flex-1 overflow-auto space-y-4 p-4">
                <TripFallBack />
                <TripFallBack />
                <TripFallBack />
            </Box>
        }>
            <TripListContent />
        </Suspense>
    )
}

function TripListContent() {
    const trips = useRecoilValue(tripAvailable)
    return (
        <>
            {
                trips.length > 0 ? (
                    trips.map((t, idx) => <TripItem key={idx} trip={t} />)
                ) : (
                    <div>Không tìm thấy chuyến nào</div>
                )
            }
        </>
    )
}


function TripFallBack() {
    return (
        <div className="border rounded-lg p-3 shadow-sm bg-white animate-pulse">
            {/* Promo Bar */}
            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>

            {/* Time + Price row */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Image + Bus Info */}
            <div className="flex gap-3">
                <div className="h-16 w-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Icons row */}
            <div className="flex gap-3 mt-3">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Button */}
            <div className="mt-3 flex justify-end">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}