import { formatPrice } from "@/helper/formatPrice";
import { PriceDetail, FlashSale } from "@/types/tripType";
import { FC } from "react";
import { Box, Text } from "zmp-ui";

interface Props {
    flashSale: FlashSale | null
    price: PriceDetail | PriceDetail[]
    typePrice: "fixed" | "byRoom" | "byRow"
}

const DetailPriceTab: FC<Props> = ({ flashSale, price, typePrice }) => {
    // Lấy text header dựa vào typePrice
    const getHeaderText = () => {
        switch (typePrice) {
            case "byRoom":
                return "Giá theo phòng";
            case "byRow":
                return "Giá theo hàng";
            case "fixed":
                return "Đồng giá";
            default:
                return "Bảng giá";
        }
    };

    // Case 1: Có flashSale và đang active
    if (flashSale && flashSale.isActive === true) {
        const finalPrice = flashSale.saleDetail.finalPrice;

        if (
            Array.isArray(finalPrice) &&
            (typePrice === "byRoom" || typePrice === "byRow")
        ) {
            return (
                <Box>
                    <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center justify-between">
                        <Text className="text-white font-semibold">{getHeaderText()}</Text>
                        <span className="bg-yellow-400 text-green-800 text-xs font-bold px-2 py-1 rounded">
                            FLASH SALE
                        </span>
                    </div>
                    <div className="space-y-2 p-3 bg-green-50 rounded-b-lg border">
                        {finalPrice.map((p: PriceDetail, idx: number) => (
                            <div
                                key={idx}
                                className="bg-green-50 rounded-lg p-3 flex justify-between items-center"
                            >
                                <Text className="text-gray-700">{p.label}</Text>
                                <Text className="text-lg font-semibold text-green-600">
                                    {formatPrice(p.value)}đ
                                </Text>
                            </div>
                        ))}
                    </div>
                </Box>
            );
        }

        // finalPrice chỉ là một object
        if (!Array.isArray(finalPrice)) {
            return (
                <Box>
                    <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center justify-between">
                        <Text className="text-white font-semibold">{getHeaderText()}</Text>
                        <span className="bg-yellow-300 text-green-800 text-xs font-bold px-2 py-1 rounded">
                            FLASH SALE
                        </span>
                    </div>
                    <div className="p-3 bg-white rounded-b-lg border">
                        <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center border">
                            <Text className="text-gray-700">{finalPrice.label}</Text>
                            <Text className="text-xl font-semibold text-green-600 border">
                                {formatPrice(finalPrice.value)}đ
                            </Text>
                        </div>
                    </div>
                </Box>
            );
        }
    }

    // Case 2: Không có flashSale → hiện giá gốc
    if (Array.isArray(price)) {
        return (
            <Box>
                <div className="bg-green-600 rounded-t-lg px-4 py-2">
                    <Text className="text-white font-semibold">{getHeaderText()}</Text>
                </div>
                <div className="space-y-2 p-3 bg-white rounded-b-lg border">
                    {price.map((p: PriceDetail, idx: number) => (
                        <div
                            key={idx}
                            className="bg-green-50 rounded-lg p-3 flex justify-between items-center border"
                        >
                            <Text className="text-gray-700">{p.label}</Text>
                            <Text className="text-lg font-semibold text-green-600">
                                {formatPrice(p.value)}đ
                            </Text>
                        </div>
                    ))}
                </div>
            </Box>
        );
    }

    return (
        <Box>
            <div className="bg-green-600 rounded-t-lg px-4 py-2">
                <Text className="text-white font-semibold">{getHeaderText()}</Text>
            </div>
            <div className="p-3 bg-white rounded-b-lg border">
                <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center border">
                    <Text className="text-gray-700">{price.label}</Text>
                    <Text className="text-xl font-semibold text-green-600">
                        {formatPrice(price.value)}đ
                    </Text>
                </div>
            </div>
        </Box>
    );
};

export default DetailPriceTab;