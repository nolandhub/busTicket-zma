import { useState } from "react"

export default function useTrip() {
    const [visibleSheet, setVisibleSheet] = useState<boolean>(false)
    const [activeTabKey, setActiveTabKey] = useState<string>("")
    const [activeImgKey, setActiveImgKey] = useState<number>(0)
    const [visibleImgView, setVisibleImgView] = useState<boolean>(false)

    function directTab(index: string) {
        setActiveTabKey(index)
        setVisibleSheet(true)
    }
    function handleSelectImg(idx: number) {
        setVisibleImgView(true)
        setActiveImgKey(idx)
    }

    return {
        visibleSheet,
        activeTabKey,
        activeImgKey,
        visibleImgView,
        setVisibleImgView,
        directTab,
        handleSelectImg,
        setVisibleSheet,
        setActiveTabKey,
    }
}