import { buildURL } from "@/helper/buildURL";
import { parseString } from "@/utils/date";
import { getLabelFromValue } from "@/helper/getLabelFromValue";
import { useNavigate, useSnackbar } from "zmp-ui";
import useCoreInit from "./useCoreInit";
import { useSetRecoilState } from "recoil";
import { buildRouteKey, getTrip2WayAvailable } from "../firebase/firestore/tripCrud";
import { startTransition, useState } from 'react';
import { tripState } from "@/state";
import { dbPromise } from "@/indexDB";
import { idbService } from "@/indexDB/idbServices";
import { Trip } from "@/types/tripType";
import dayjs from "dayjs";

export default function useSearch() {
    const { openSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const { departDate, destination, departure, setIsReturn, setDeparture, setDestination } = useCoreInit()
    const setTrips = useSetRecoilState(tripState)
    const [loading, setLoading] = useState<boolean>(false) //loading if wait data

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

            const mockTrips: Trip[] = [
                {
                    id: "trip-saigon-hanoi-01",
                    routeId: "saigon-hanoi",
                    routeName: "Sài Gòn - Hà Nội",
                    compId: "cuctung",
                    compName: "Cúc Tùng Limousine",
                    busName: "Limousine 20 Phòng Đôi VIP",

                    priceType: "fixed",
                    price: [
                        {
                            time: "08:00",
                            detail: [
                                { label: "Đồng giá", value: 200000 },
                            ],
                        },
                        {
                            time: "09:00",
                            detail: [
                                { label: "Đồng giá", value: 200000 },
                            ],
                        },
                    ],

                    saleId: "sale-2010",
                    snapShotSale: {
                        saleId: "sale-2010",
                        label: "Khuyến mãi 20/10",
                        type: "fixed",
                        value: 20000,
                        startDate: "2025-10-18T00:00:00.000Z",
                        endDate: "2025-11-21T23:59:59.000Z",
                        updateAt: "2025-10-18T08:00:00.000Z",
                        isActive: true,
                    },
                    salePrice: [
                        {
                            time: "08:00",
                            detail: [
                                { label: "Đồng giá", value: 180000 },
                            ],
                        },
                        {
                            time: "09:00",
                            detail: [
                                { label: "Đồng giá", value: 180000 },
                            ],
                        },
                    ],
                    routeConfig: {
                        forward: {
                            key: "saigon",
                            startLocation: "Bến xe Miền Đông",
                            endLocation: "Bến xe Giáp Bát",
                            pickUp: [
                                { title: "Quận 1", subTitle: "VP 123 Nguyễn Huệ" },
                                { title: "Quận 7", subTitle: "Lotte Mart" },
                            ],
                            dropOff: [
                                { title: "Giáp Bát", subTitle: "Cổng chính bến xe" },
                                { title: "Cầu Giấy", subTitle: "Ngã tư Cầu Giấy" },
                            ],
                        },
                        backward: {
                            key: "hanoi",
                            startLocation: "Bến xe Giáp Bát",
                            endLocation: "Bến xe Miền Đông",
                            pickUp: [
                                { title: "Giáp Bát", subTitle: "Cổng chính bến xe" },
                                { title: "Cầu Giấy", subTitle: "Ngã tư Cầu Giấy" },
                            ],
                            dropOff: [
                                { title: "Quận 1", subTitle: "VP 123 Nguyễn Huệ" },
                                { title: "Quận 7", subTitle: "Lotte Mart" },
                            ],
                        },
                    },

                    createAt: new Date("2025-10-10T09:00:00.000Z"),
                    updateAt: new Date("2025-10-18T09:00:00.000Z"),
                    isDelete: false,
                },

                // 🚍 Trip 2
                {
                    id: "trip-hanoi-danang-01",
                    routeId: "hanoi-danang",
                    routeName: "Hà Nội - Đà Nẵng",
                    compId: "phuongtrang",
                    compName: "Phương Trang Express",
                    busName: "Giường nằm cao cấp",

                    priceType: "fixed",
                    price: [
                        {
                            time: "07:30",
                            detail: [
                                { label: "Ghế thường", value: 250000 },
                                { label: "Giường VIP", value: 350000 },
                            ],
                        },
                        {
                            time: "13:00",
                            detail: [
                                { label: "Ghế thường", value: 250000 },
                                { label: "Giường VIP", value: 350000 },
                            ],
                        },
                    ],

                    saleId: "sale-tet-2025",
                    snapShotSale: {
                        saleId: "sale-tet-2025",
                        label: "Giảm giá Tết 2025",
                        type: "percent",
                        value: 10,
                        startDate: "2025-01-20T00:00:00.000Z",
                        endDate: "2025-02-10T23:59:59.000Z",
                        updateAt: "2025-01-10T08:00:00.000Z",
                        isActive: true,
                    },
                    salePrice: [
                        {
                            time: "07:30",
                            detail: [
                                { label: "Ghế thường", value: 225000 },
                                { label: "Giường VIP", value: 315000 },
                            ],
                        },
                        {
                            time: "13:00",
                            detail: [
                                { label: "Ghế thường", value: 225000 },
                                { label: "Giường VIP", value: 315000 },
                            ],
                        },
                    ],

                    routeConfig: {
                        forward: {
                            key: "hanoi",
                            startLocation: "Bến xe Giáp Bát",
                            endLocation: "Bến xe Trung tâm Đà Nẵng",
                            pickUp: [
                                { title: "Giáp Bát", subTitle: "Cổng chính bến xe" },
                                { title: "Mỹ Đình", subTitle: "Cổng số 2 bến xe Mỹ Đình" },
                            ],
                            dropOff: [
                                { title: "Trung tâm Đà Nẵng", subTitle: "VP 12 Nguyễn Văn Linh" },
                                { title: "Liên Chiểu", subTitle: "Bến xe Đà Nẵng" },
                            ],
                        },
                        backward: {
                            key: "danang",
                            startLocation: "Bến xe Đà Nẵng",
                            endLocation: "Bến xe Giáp Bát",
                            pickUp: [
                                { title: "Trung tâm Đà Nẵng", subTitle: "VP 12 Nguyễn Văn Linh" },
                                { title: "Liên Chiểu", subTitle: "Bến xe Đà Nẵng" },
                            ],
                            dropOff: [
                                { title: "Giáp Bát", subTitle: "Cổng chính bến xe" },
                                { title: "Mỹ Đình", subTitle: "Cổng số 2 bến xe Mỹ Đình" },
                            ],
                        },
                    },

                    createAt: new Date("2025-10-12T08:30:00.000Z"),
                    updateAt: new Date("2025-10-18T09:30:00.000Z"),
                    isDelete: false,
                },
            ]

            setTrips(mockTrips)




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