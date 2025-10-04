import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/helper/getLabelFromValue";
import { useNavigate, useSnackbar } from "zmp-ui";
import useCoreInit from "./useCoreInit";
import { useSetRecoilState } from "recoil";
import { routeIdState } from "@/state";
import { startTransition } from 'react';



export default function useSearch() {
    const { departDate, destination, departure, setIsReturn, setDeparture, setDestination } = useCoreInit()

    const setRouteId = useSetRecoilState(routeIdState)

    const { openSnackbar } = useSnackbar()
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsReturn(true)
        navigate("/repickCore")
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

        startTransition(() => { /* hold old data when wait new data api */
            setRouteId(`${departure}-${destination}`)

            if (location.pathname === "/availableTrip") {
                navigate(url, { replace: true });   //No direct new page base on 'replace'
            } else {
                navigate(url);
            }
        });
    }

    return {
        handleSwitch,
        handleSearch,
        handleSwap
    }



}