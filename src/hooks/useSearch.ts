import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/helper/getLabelFromValue";
import { useNavigate, useSnackbar } from "zmp-ui";
import useCoreInit from "./useCoreInit";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { buildRouteKey, getTrip2WayAvailable } from "../firebase/firestore/tripCrud";
import { startTransition, useEffect, useState } from 'react';
import { isRegisteredState, tripState } from "@/state";
import { dbPromise } from "@/indexDB";
import { idbService } from "@/indexDB/idbServices";
import { Trip } from "@/types/tripType";
import dayjs from "dayjs";
import busTrips from "@/mock/mockTrip";
import useUserInfo from "./useUserInfo";

export default function useSearch() {
    const { openSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const { departDate, destination, departure, setIsReturn, setDeparture, setDestination } = useCoreInit()
    const setTrips = useSetRecoilState(tripState)
    const [loading, setLoading] = useState<boolean>(false) //loading if wait data
    const { isRegistered } = useUserInfo()

    const handleSwitch = () => {
        setIsReturn(true)
        navigate("/repickCore")
    }

    const handleSwap = () => {
        setDeparture(destination)
        setDestination(departure)
    }

    const syncTripIfNeeded = async (routeId: string, localTrip: Trip[]) => {
        const snapShot = await getTrip2WayAvailable(routeId)

        const isUpdated = snapShot.some(newData => {
            const check = localTrip.find(t => t.id === newData.id)

            return !check || dayjs(newData.updateAt).valueOf() > (dayjs(check.updateAt)).valueOf()
            // !local -> new Record on fireStore || UpdateAt changed -> have new Update
        })

        if (isUpdated) {
            for (const data of snapShot) {
                await idbService.upSert("trips", data.id, data)
            }
            setTrips(snapShot)
        }
    }

    const searchTrips = async (routeId: string) => {
        try {
            // setLoading(true)
            // const db = await dbPromise
            // const { directKey, reverseKey } = buildRouteKey(routeId)
            // const tripCachedDirect = await db.getAllFromIndex("trips", "routeId", directKey)

            // if (tripCachedDirect.length > 0) {
            //     setTrips(tripCachedDirect)
            //     await syncTripIfNeeded(directKey, tripCachedDirect)  //sync data
            // } else {
            //     const tripCachedReverse = await db.getAllFromIndex("trips", "routeId", reverseKey)
            //     if (tripCachedReverse.length > 0) {
            //         setTrips(tripCachedDirect)
            //         await syncTripIfNeeded(directKey, tripCachedDirect)  //sync data
            //     } else {
            //         // no data cached => get new from fireStore
            //         const trips = await getTrip2WayAvailable(directKey)
            //         setTrips(trips || [])

            //         for (const data of trips) {
            //             await idbService.upSert("trips", data.id, data)
            //         }
            //     }
            // }
            // setLoading(false)

            setTrips(busTrips)

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
        if (!isRegistered) {
            navigate("/")
            openSnackbar({
                text: "BẠN CHƯA ĐĂNG KÝ ,HÃY ĐĂNG KÝ TRƯỚC KHI TÌM CHUYẾN!",
                type: "error",
            });
            return
        }

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

        searchTrips(`${departure}-${destination}`) //Get - Set Trips ATOM (2 way)

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