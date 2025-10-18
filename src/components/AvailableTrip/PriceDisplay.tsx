import { formatPrice } from "@/helper/formatPrice";
import { getPriceRange } from "@/helper/getPriceRange";
import { departureDateState } from "@/state";
import { PriceDetail, SaleDetail } from "@/types/tripType";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Text } from 'zmp-ui';

interface Props {
    price: PriceDetail[];
    salePrice?: PriceDetail[] | null;
    snapShotSale?: SaleDetail | null;
    onDetailClick?: () => void;
}

const PriceDisplay: FC<Props> = ({
    price,
    salePrice,
    snapShotSale,
    onDetailClick
}) => {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const departDate = useRecoilValue(departureDateState)

    // Countdown timer cho flash sale
    useEffect(() => {
        if (!snapShotSale?.isActive || !snapShotSale.endDate) return;

        const updateTime = () => {
            const now = dayjs();
            const depart = dayjs(departDate);
            const end = dayjs(snapShotSale.endDate);

            // Tính offset theo ngày khởi hành
            const daysDiff = depart.startOf('day').diff(now.startOf('day'), 'days');
            const offsetSeconds = daysDiff * 24 * 60 * 60;
            const adjustedEnd = end.subtract(offsetSeconds, "seconds");

            const diff = adjustedEnd.diff(now, "seconds");
            setRemainingTime(diff > 0 ? diff : 0);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [snapShotSale, departDate]);

    // Check sale có active không
    const isSaleActive = useMemo(() => {
        if (!snapShotSale?.isActive || !salePrice) return false;
        if (remainingTime <= 0) return false;

        const depart = dayjs(departDate);
        const saleEnd = dayjs(snapShotSale.endDate);
        return !depart.isAfter(saleEnd);
    }, [snapShotSale, salePrice, departDate, remainingTime]);

    // Quyết định hiển thị giá nào
    const displayPrice = isSaleActive && salePrice ? salePrice : price;
    const originPriceRange = getPriceRange(price);
    const displayPriceRange = getPriceRange(displayPrice);

    // Render sale badge
    const renderSaleBadge = () => {
        if (!snapShotSale) return null;

        const isPercent = snapShotSale.type === "percent";
        const badgeText = isPercent
            ? `-${snapShotSale.value}%`
            : `GIẢM ${formatPrice(snapShotSale.value)}đ`;

        const bgColor = isPercent ? "bg-red-500" : "bg-green-500";

        return (
            <Text className={`text-white text-xs ${bgColor} rounded-full font-bold px-2 py-0.5`}>
                {badgeText}
            </Text>
        );
    };

    // Render giá gạch ngang (giá gốc khi có sale)
    const renderOriginalPrice = () => {
        if (!isSaleActive) return null;

        if (originPriceRange.isRange) {
            return (
                <div className="flex flex-row justify-end space-x-1">
                    <Text className="text-slate-600 line-through text-xs">
                        {formatPrice(originPriceRange.min)}đ
                    </Text>
                    <Text className="text-xs">-</Text>
                    <Text className="text-slate-600 line-through text-xs">
                        {formatPrice(originPriceRange.max)}đ
                    </Text>
                </div>
            );
        }

        return (
            <Text className="text-slate-800 line-through text-xs">
                {formatPrice(originPriceRange.value)}đ
            </Text>
        );
    };

    // Render giá hiển thị chính
    const renderDisplayPrice = () => {
        if (displayPriceRange.isRange) {
            return (
                <div className="flex flex-row justify-end space-x-1 items-baseline">
                    <Text className="text-slate-500 text-[10px]">Từ</Text>
                    <Text className="text-md font-bold text-end">
                        {formatPrice(displayPriceRange.min)}đ
                    </Text>
                    <Text className="text-md font-bold">-</Text>
                    <Text className="text-md font-bold text-end">
                        {formatPrice(displayPriceRange.max)}đ
                    </Text>
                </div>
            );
        }

        return (
            <Text className="text-md font-bold text-end">
                {formatPrice(displayPriceRange.value)}đ
            </Text>
        );
    };

    return (
        <Box className="flex flex-col flex-1 gap-1 justify-end items-end">
            {/* Giá hiển thị */}
            {renderDisplayPrice()}

            {/* Giá gốc (gạch ngang) + Sale badge */}
            {isSaleActive && (
                <div className="flex flex-col gap-1 items-end">
                    {renderOriginalPrice()}
                    {renderSaleBadge()}
                </div>
            )}

            {/* Link chi tiết */}
            {onDetailClick && (
                <Text
                    onClick={onDetailClick}
                    className="cursor-pointer underline underline-offset-2 font-medium text-end text-indigo-700 text-sm mt-1"
                >
                    Thông tin chi tiết
                </Text>
            )}
        </Box>
    );
};

export default PriceDisplay;