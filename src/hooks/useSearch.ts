import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/helper/getLabelFromValue";
import { useNavigate, useSnackbar } from "zmp-ui";
import useCoreInit from "./useCoreInit";
import { useRecoilValue } from "recoil";
import { routeIdState } from "@/state";



export default function useSearch() {
    const { departDate, destination, departure, setIsReturn, setDeparture, setDestination } = useCoreInit()

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



        if (location.pathname === "/availableTrip") {
            // Nếu đã ở trang này rồi, chỉ cập nhật URL
            navigate(url, { replace: true });
        } else {
            // Lần đầu: navigate bình thường
            navigate(url);
        }

    }

    return {
        handleSwitch,
        handleSearch,
        handleSwap
    }



}