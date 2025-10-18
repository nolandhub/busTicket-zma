import { PriceDetail, SaleDetail } from "@/types/tripType";
import { FC, useMemo } from "react";
import ListPriceDetail from "../AvailableTrip/ListPriceDetail";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { departureDateState } from "@/state";

interface SelectTimeProps {
    snapShotSale?: SaleDetail | null
    salePrice?: PriceDetail[] | null
    price: PriceDetail[]
}

const SelectTime: FC<SelectTimeProps> = ({ price, salePrice, snapShotSale }) => {
    const departDate = useRecoilValue(departureDateState)
    const isSaleActive = useMemo(() => {
        if (!snapShotSale?.isActive || !salePrice) return false;
        const depart = dayjs(departDate);
        const saleEnd = dayjs(snapShotSale.endDate);
        return !depart.isAfter(saleEnd);
    }, [snapShotSale, departDate, salePrice]);

    const activePrice = isSaleActive && salePrice ? salePrice : price

    return (
        <>
            <ListPriceDetail prices={activePrice} />
        </>
    )

}

export default SelectTime