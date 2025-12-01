import { hideHeaderState, selectedTripState } from "@/state"
import { TripWithSale } from "@/types/tripType"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "zmp-ui"

export default function useTrip() {
    const setHideHeader = useSetRecoilState(hideHeaderState)

    const [open, setOpen] = useState<boolean>(false)
    const handleClick = (val: boolean) => {
        setOpen(val)
    }
    const [visibleSheet, setVisibleSheet] = useState<boolean>(false)
    const [activeTabKey, setActiveTabKey] = useState<string>("")
    const [activeImgKey, setActiveImgKey] = useState<number>(0)
    const [visibleImgView, setVisibleImgView] = useState<boolean>(false)
    const setSelectedTrip = useSetRecoilState(selectedTripState)

    const navigate = useNavigate()

    function directTab(index: string) {
        setActiveTabKey(index)
        setVisibleSheet(true)
    }
    function handleSelectImg(idx: number) {
        setHideHeader(true)
        setVisibleImgView(true)
        setActiveImgKey(idx)
    }
    function handleSelectTrip(trip: TripWithSale) {
        setSelectedTrip(trip)
        navigate("/booking")
    }

    return {
        visibleSheet,
        activeTabKey,
        activeImgKey,
        visibleImgView,
        open,
        handleClick,
        setVisibleImgView,
        directTab,
        handleSelectImg,
        setVisibleSheet,
        setActiveTabKey,
        handleSelectTrip
    }
}