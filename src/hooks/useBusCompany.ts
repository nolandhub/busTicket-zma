//get BusCompany[] Data
import { useEffect } from "react";
import { idbService } from "@/indexDB/idbServices";
import { useSetRecoilState } from "recoil";
import { busCompanyState } from "@/state";
import dayjs from "dayjs";
import { getCompanies } from "@/firebase/firestore/compCrud";
import { BusCompany } from "@/types/busCompanyType";

export default function useBusCompany() {
    const setCompAtom = useSetRecoilState(busCompanyState)

    const syncIfNeeded = async (localData: BusCompany[]) => {
        const snapShot = await getCompanies()

        const isUpdated = snapShot.some(r => {
            const check = localData.find(f => f.id == r.id)
            return !check || dayjs(r.updateAt).valueOf() > dayjs(check.updateAt).valueOf()
        })

        if (isUpdated) {
            setCompAtom(snapShot)
            for (const data of snapShot) {
                await idbService.upSert("companies", data.id, data)
            }
        }
    }

    function getSyncCompanies() {

        useEffect(() => {
            const fetchCached = async () => {
                try {
                    const cached = await idbService.getAllData("companies")
                    if (cached.length >= 1) {
                        setCompAtom(cached)
                        await syncIfNeeded(cached)
                    } else {
                        const res = await getCompanies()
                        if (res) {
                            setCompAtom(res)
                            for (const data of res) {
                                await idbService.upSert("companies", data.id, data)
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchCached()
        }, [])
    }

    return { getSyncCompanies }
}
