import { hideHeaderState } from "@/state"
import { BusCompany } from "@/types/busCompanyType"
import { FC } from "react"
import { useSetRecoilState } from "recoil"
import { ImageViewer } from "zmp-ui"

interface Props {
    busCompany?: BusCompany
    imageViewer: {
        activeImgKey: number
        visibleImgView: boolean
        setVisibleImgView: (p: boolean) => void
    }
}

interface ImgProps {
    src: string
    alt?: string
}

const ImageViewerCustom: FC<Props> = ({ busCompany, imageViewer }) => {
    const imgsPresent: ImgProps[] = busCompany?.imagesInterior?.map((src, idx) => ({
        src,
        alt: `image-${idx}`,
    })) || [] // fallback khi undefined/ fallback khi undefined

    const setHideHeader = useSetRecoilState(hideHeaderState)
    function handleOnClose() {
        imageViewer.setVisibleImgView(false)
        setHideHeader(false)

    }
    return (
        <ImageViewer
            activeIndex={imageViewer.activeImgKey}
            images={imgsPresent}
            onClose={handleOnClose}
            visible={imageViewer.visibleImgView}
        />
    )
}
export default ImageViewerCustom

