import { BusCompany } from "@/types/busCompanyType"
import { FC } from "react"
import { ImageViewer } from "zmp-ui"

interface Props {
    busCompany: BusCompany
    imageViewer: {
        activeImgKey: number
        visibleImgView
        setVisibleImgView: (p: boolean) => void
    }
}

interface ImgProps {
    src: string
    alt?: string
}

const ImageViewerCustom: FC<Props> = ({ busCompany, imageViewer }) => {
    const imgsPresent: ImgProps[] = busCompany.imagesInterior.map((src, idx) => ({
        src,
        idx
    }))
    return (
        <>
            <ImageViewer
                activeIndex={imageViewer.activeImgKey}
                images={imgsPresent}
                onClose={() => imageViewer.setVisibleImgView(false)}
                visible={imageViewer.visibleImgView}
            />
        </>
    )
}

export default ImageViewerCustom