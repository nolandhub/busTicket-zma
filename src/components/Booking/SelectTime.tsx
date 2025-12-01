import { PriceByTime } from "@/types/tripType";
import { FC } from "react";
import ListPriceDetail from "../AvailableTrip/ListPriceDetail";
import { Box, Text } from "zmp-ui";

interface SelectTimeProps {
    price: PriceByTime[]
}

const SelectTime: FC<SelectTimeProps> = ({ price }) => {

    return (
        <Box className="flex flex-col p-2 space-y-4">
            <Text className="font-bold text-2xl text-center">Chọn giờ xuất bến</Text>
            <ListPriceDetail prices={price} />
        </Box>
    )

}

export default SelectTime
