import { selectedTripState } from "@/state"
import { useState } from "react"
import { useRecoilValue } from "recoil"

export default function useBooking() {
    const tripSelected = useRecoilValue(selectedTripState)
    const [total, setTotalNum] = useState<number>(0)


    const handleIncrease = () => {
        setTotalNum(total + 1)
    }

    const handleDecrease = () => {
        if (total <= 0) {
            setTotalNum(0)
        }
        setTotalNum(total - 1)
    }


    return {
        tripSelected,

    }



}

