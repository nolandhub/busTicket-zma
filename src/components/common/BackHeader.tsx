import useCoreInit from "@/hooks/useCoreInit";
import { bookingState, hideHeaderState, priceOptionState } from "@/state";
import { parseString } from "@/utils/date";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Header, useNavigate, Text } from "zmp-ui";

interface BackHeaderProps {
    title?: string | React.ReactNode;
    backTo?: string;
    backSearchParams?: Record<string, string>;
    onClickChange?: () => void
}

const BackHeader: FC<BackHeaderProps> = ({ title, backTo, backSearchParams, onClickChange }) => {
    const navigate = useNavigate();
    const { fromLabel, toLabel, departDate, isReturn, controlReturn } = useCoreInit()
    const isHidden = useRecoilValue(hideHeaderState)
    const resetPriceOpt = useResetRecoilState(priceOptionState)
    const resetBookingData = useResetRecoilState(bookingState)

    const handleBack = () => {
        if (backTo) {
            const search = backSearchParams
                ? '?' + new URLSearchParams(backSearchParams).toString()
                : '';
            navigate(`${backTo}${search}`);
        } else {
            resetPriceOpt()
            resetBookingData()
            navigate(-1);
        }
    };
    return (

        <Header
            className={`${isHidden ? "hidden" : "flex"}`}
            title={!title ?
                <Box className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <Text.Title>{fromLabel} - {toLabel}</Text.Title>
                            <Text bold size="xLarge" className=" text-gray-600">{parseString(departDate)}</Text>
                        </div>

                        <Text onClick={onClickChange} className="cursor-pointer mt-8 underline underline-offset-2">
                            Thay đổi
                        </Text>
                    </div>
                    {/* {isReturn && (!controlReturn ?
                        <Text className="font-bold text-xl" >Chọn chiều đi</Text> :
                        <Text className="font-bold text-xl">Chọn chiều về</Text>)} */}
                </Box> :
                title
            }
            showBackIcon
            onBackClick={handleBack}
            backgroundColor="#BBD6F2"
        />
    );
};

export default BackHeader;

