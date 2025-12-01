import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/helper/getLabelFromValue";
import { useNavigate, useSnackbar } from "zmp-ui";
import useCoreInit from "./useCoreInit";
import { useSetRecoilState } from "recoil";
import { startTransition, useState } from 'react';
import { tripState } from "@/state";
import dayjs from "dayjs";
import TripMocks from "@/mock/mockTrip";
import useBusCompany from "./useBusCompany";
import { fetchAvailableTrips } from "@/services/tripService";
import { TripWithSale } from "@/types/tripType";

export default function useSearch() {
    const { openSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const { departDate, destination, departure, setIsReturn, setDeparture, setDestination } = useCoreInit()
    const setTrips = useSetRecoilState(tripState)

    const [loading, setLoading] = useState<boolean>(false) //loading if wait data


    const { getSyncCompanies } = useBusCompany()
    getSyncCompanies()

    const handleSwitch = () => {
        setIsReturn(true)
        navigate("/repickCore")
    }

    const handleSwap = () => {
        setDeparture(destination)
        setDestination(departure)
    }



    const searchTrips = async (routeCode: string, departDate: string) => {
        try {
            console.log(routeCode, departDate)

            const res = await fetchAvailableTrips(routeCode, departDate)

            setTrips(res)

        } catch (error) {
            console.log(error)
            openSnackbar({
                icon: true,
                text: "Đã có lỗi xảy ra trong quá trình lấy dữ liệu, hãy thử lại"
            });
            setTrips([])
        }
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


        searchTrips(`${departure}-${destination}`, dayjs(departDate).format("YYYY-MM-DD"))

        startTransition(() => { /* hold old data when wait new data api */
            if (location.pathname === "/availableTrip") {
                navigate(url, { replace: true });   //No direct new page base on 'replace'
            } else {
                navigate(url);
            }
        });
    }

    return {
        searchTrips,
        handleSwitch,
        handleSearch,
        handleSwap,
        loading
    }



}