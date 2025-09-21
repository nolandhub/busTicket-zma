import {
    departureState,
    destinationState,
    departureDateState,
    isReturnState,
    returnDateState
} from "@/state";

import { buildURL } from "@/utils/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/utils/getLabelFromValue";
import { useRecoilState } from "recoil";
import { useNavigate, useSnackbar } from "zmp-ui";

export default function useSearch() {
    const { openSnackbar } = useSnackbar()
    const [departure, setDeparture] = useRecoilState(departureState)
    const [destination, setDestination] = useRecoilState(destinationState)
    const [departDate, setDepartDate] = useRecoilState(departureDateState)
    const [isReturn, setIsReturn] = useRecoilState(isReturnState)
    const [returnDate, setReturnDate] = useRecoilState(returnDateState)

    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsReturn(!isReturn)
        navigate("/setReturnDate")

    }

    const handleSwap = () => {
        setDeparture(destination)
        setDestination(departure)
    }

    const handleSearch = () => {
        if (departure === destination) {
            openSnackbar({
                icon: true,
                text: "Nơi đến và đi trùng nhau, vui lòng nhập lại!"
            });
            return
        }

        if (!departure || !destination || !departDate) {
            openSnackbar({
                icon: true,
                text: "Vui lòng nhập đủ thông tin!"
            });
            return
        }
        const url = buildURL("/availableTrip", {
            from: departure,
            to: destination,
            date: parseString(departDate),
            fromLabel: getLabelFromValue(departure),
            toLabel: getLabelFromValue(destination),
        })

        navigate(url)
    }
    return {
        departure,
        destination,
        departDate,
        returnDate,
        isReturn,
        handleSwitch,
        setIsReturn,
        setReturnDate,
        setDeparture,
        setDestination,
        setDepartDate,
        handleSearch,
        handleSwap
    }
}