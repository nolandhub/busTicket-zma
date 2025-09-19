import { departureState, destinationState, dateState } from "@/state";
import { buildURL } from "@/utils/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/utils/getLabelFromValue";
import { useRecoilState } from "recoil";
import { useNavigate, useSnackbar } from "zmp-ui";


export default function useSearch() {
    const { openSnackbar } = useSnackbar()

    const [departure, setDeparture] = useRecoilState(departureState)
    const [destination, setDestination] = useRecoilState(destinationState)
    const [date, setDate] = useRecoilState(dateState)

    const navigate = useNavigate();

    const handleSwap = () => {
        setDeparture(destination)
        setDestination(departure)
    }

    const handleSearch = () => {
        if (!departure || !destination || !date) {
            openSnackbar({
                icon: true,
                text: "Vui lòng kiểm tra lại thông tin của bạn."
            });
            return
        }


        const url = buildURL("/availableTrip", {
            from: departure,
            to: destination,
            date: parseString(date),
            fromLabel: getLabelFromValue(departure),
            toLabel: getLabelFromValue(destination),
        })


        navigate(url)

    }

    return {
        departure,
        destination,
        date,
        setDeparture,
        setDestination,
        setDate,
        handleSearch,
        handleSwap
    }




}