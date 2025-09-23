import {
    departureState,
    destinationState,
    departureDateState,
    isReturnState,
    returnDateState
} from "@/state";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useCoreInit() {
    const [departure, setDeparture] = useRecoilState(departureState)
    const [destination, setDestination] = useRecoilState(destinationState)
    const [departDate, setDepartDate] = useRecoilState(departureDateState)
    const [isReturn, setIsReturn] = useRecoilState(isReturnState)
    const [returnDate, setReturnDate] = useRecoilState(returnDateState)
    const resetReturnDate = useResetRecoilState(returnDateState)

    return {
        departure,
        destination,
        departDate,
        returnDate,
        isReturn,
        resetReturnDate,
        setIsReturn,
        setReturnDate,
        setDeparture,
        setDestination,
        setDepartDate,
    }
}