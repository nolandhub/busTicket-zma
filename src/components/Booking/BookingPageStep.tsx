import { Box, Button, Icon } from "zmp-ui";
import BookingReview from "./ReviewBooking";
import SelectTime from "./SelectTime";
import useBookingStep from "@/hooks/useBookingStep";
import InfoOption from "./InfoOption";
import { useEffect, useState } from "react";
import ButtonOrder from "../common/buttons/ButtonOrder";

export default function BookingStep() {
    const { step, tripSelected, handleNext, handleBack, handleOrder, dataBooking, priceOpt } = useBookingStep()
    const [isHidden, setHidden] = useState<boolean>(false)

    useEffect(() => {
        if (step == "review") {
            setHidden(true)
        }
    }, [step])

    return (
        <Box className="flex flex-col gap-4 justify-center bg-slate-100">
            <Box className="flex-1 pt-4">
                {step === "time" && (
                    <SelectTime
                        snapShotSale={tripSelected?.snapShotSale}
                        salePrice={tripSelected?.salePrice}
                        price={tripSelected?.price!}
                    />
                )}
                {step === "info" && priceOpt && (
                    <>
                        <InfoOption price={priceOpt} />
                    </>

                )}
                {step === "review" && dataBooking && (
                    <>
                        <BookingReview data={dataBooking} />
                        <ButtonOrder onOrder={(messageToken) => { handleOrder(messageToken) }} />
                    </>
                )}
            </Box>

            {/*             {`${isHidden ? "hidden" : "sticky flex justify-around"}`}
 */}
            <Box className={`${isHidden ? "hidden" : "sticky flex justify-around"}`}>
                <Button prefixIcon={<Icon icon="zi-arrow-left" />} onClick={handleBack}>
                    Quay lại
                </Button>
                <Button suffixIcon={<Icon icon="zi-arrow-right" />} onClick={handleNext}>
                    Tiếp tục
                </Button>
            </Box>
        </Box>
    )
}