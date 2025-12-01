import { departureDateState } from "@/state";
import { PriceByTime, SaleDetail } from "@/types/tripType";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";
import ListPriceDetail from "../ListPriceDetail";

interface Props {
    snapShotSale?: SaleDetail | null;
    price: PriceByTime[];
    priceType: string;
}

const DetailPriceTab: FC<Props> = ({ snapShotSale, price, priceType }) => {
    const departDate = useRecoilValue(departureDateState);

    // Lấy text header dựa vào priceType
    const headerText = useMemo(() => {
        switch (priceType) {
            case "byBed":
                return "Giá theo giường";
            case "byRow":
                return "Giá theo hàng";
            case "fixed":
                return "Đồng giá";
            default:
                return "Bảng giá";
        }
    }, [priceType]);

    // Kiểm tra sale có active và còn hạn không
    const isSaleActive = useMemo(() => {
        if (!snapShotSale?.isActive) return false;
        const depart = dayjs(departDate);
        const saleEnd = dayjs(snapShotSale.endDate);
        return !depart.isAfter(saleEnd);
    }, [snapShotSale, departDate]);

    const showSaleBadge = isSaleActive && snapShotSale;

    return (
        <Box>
            {/* Header */}
            <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center justify-between">
                <Text className="text-white font-semibold">{headerText}</Text>
                {showSaleBadge && (
                    <span className="bg-yellow-400 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        {snapShotSale.label}
                    </span>
                )}
            </div>

            {/* Price Content */}
            {
                <ListPriceDetail prices={price} />
            }
        </Box>
    );
};

export default DetailPriceTab;