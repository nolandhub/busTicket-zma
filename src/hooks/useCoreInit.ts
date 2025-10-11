import { getLabelFromValue } from "@/helper/getLabelFromValue";
import {
    departureState,
    destinationState,
    departureDateState,
    isReturnState,
    returnDateState,
    controlReturnState,
} from "@/state";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useCoreInit() {
    const [departure, setDeparture] = useRecoilState(departureState)
    const [destination, setDestination] = useRecoilState(destinationState)
    const [departDate, setDepartDate] = useRecoilState(departureDateState)
    const [isReturn, setIsReturn] = useRecoilState(isReturnState)
    const [returnDate, setReturnDate] = useRecoilState(returnDateState)
    const [controlReturn, setControlReturn] = useRecoilState(controlReturnState)
    const resetReturnDate = useResetRecoilState(returnDateState)

    const fromLabel = getLabelFromValue(departure)
    const toLabel = getLabelFromValue(destination)

    return {
        fromLabel,
        toLabel,
        departure,
        destination,
        departDate,
        returnDate,
        isReturn,
        controlReturn,
        setControlReturn,
        resetReturnDate,
        setIsReturn,
        setReturnDate,
        setDeparture,
        setDestination,
        setDepartDate,
    }
}