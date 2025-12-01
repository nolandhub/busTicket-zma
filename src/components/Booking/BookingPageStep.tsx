import { Box, Button, Icon } from "zmp-ui";
import BookingReview from "./ReviewBooking";
import SelectTime from "./SelectTime";
import useBookingStep from "@/hooks/useBookingStep";
import InfoOption from "./InfoOption";
import ConfirmSection from "./ConfirmSection";

export default function BookingStep() {
    const {
        step,
        tripSelected,
        handleNext,
        handleBack,
        dataBooking,
        priceOpt,
        handleConfirm,
        loading,
        hiddenStepBtn
    } = useBookingStep()

    return (
        <Box className="flex flex-col gap-4 justify-center bg-slate-100">
            <Box className="flex-1 pt-4">
                {step === "time" && (
                    <SelectTime
                        price={tripSelected?.price!}
                    />
                )}
                {step === "info" && priceOpt && (
                    <InfoOption price={priceOpt} />
                )}
                {step === "review" && dataBooking && (
                    <Box className="flex flex-col gap-2">
                        <div className="flex justify-start items-center my-2 ml-1">
                            <Button className="flex font-bold  items-center text-center" prefixIcon={<Icon icon="zi-arrow-left" />} onClick={handleBack}>
                                Chỉnh sửa
                            </Button>
                        </div>
                        <BookingReview data={dataBooking} />

                        <ConfirmSection loading={loading} total={dataBooking.total || 0} onConfirm={() => { handleConfirm(dataBooking) }} />
                    </Box>
                )}
            </Box>

            <Box className={`${hiddenStepBtn ? "hidden" : "sticky px-6 gap-6 bottom-0 flex justify-around pb-2"}`}>
                <Button fullWidth prefixIcon={<Icon icon="zi-arrow-left" />} onClick={handleBack}>
                    Quay lại
                </Button>
                <Button fullWidth suffixIcon={<Icon icon="zi-arrow-right" />} onClick={handleNext}>
                    Tiếp tục
                </Button>
            </Box>

        </Box>
    )
}