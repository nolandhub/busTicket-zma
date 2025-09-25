import { MapPin, Locate } from "lucide-react";
import { Box, Button, DatePicker, Icon, Switch } from "zmp-ui";
import InputPicker from "../common/InputPicker";
import useCoreInit from "@/hooks/useCoreInit";
import useSearch from "@/hooks/useSearch";
import { parseString } from "@/utils/date";


const SearchArea = () => {
    const {
        departure,
        destination,
        departDate,
        isReturn,
        returnDate,
        setReturnDate,
        setDeparture,
        setDestination,
        setDepartDate,
    } = useCoreInit();

    const { handleSearch, handleSwap, handleSwitch } = useSearch()

    return (
        <Box className="p-2 flex justify-center">
            <Box className="w-full max-w-2xl border rounded-xl border-gray-200 shadow-lg bg-white p-4 md:p-2 flex flex-col gap-4">
                <Box className="flex-1 flex flex-col sm:flex-row items-stretch gap-2">
                    <Box className="flex-1 flex items-center">
                        <InputPicker
                            icon={<MapPin size={24} color="red" strokeWidth={2} />}
                            tittle="Chọn nơi đi"
                            value={departure}
                            placeholder="Nơi đi"
                            onChange={(val) => setDeparture(val.suggestions.value as string)}
                        />
                    </Box>

                    <Box className="flex items-center justify-center sm:w-auto">
                        <Button
                            onClick={handleSwap}
                            type="neutral"
                            variant="secondary"
                            icon={
                                <Icon
                                    icon="zi-reorder-solid"
                                    className="transform transition-transform duration-200 md:rotate-90"
                                />
                            }
                        />
                    </Box>

                    <Box className="flex-1 flex items-center">
                        <InputPicker
                            icon={<Locate size={24} color="blue" strokeWidth={3} />}
                            tittle="Chọn nơi đến"
                            value={destination}
                            placeholder="Nơi đến"
                            onChange={(val) => setDestination(val.suggestions.value as string)}
                        />
                    </Box>
                </Box>

                {/* Date input */}
                <Box className="flex flex-col gap-4 ">
                    <Box className="pl-7 w-full flex flex-col gap-2">
                        <DatePicker
                            label="Ngày đi"
                            startDate={new Date()}
                            value={departDate}
                            placeholder={parseString(departDate)}
                            onChange={setDepartDate}
                        />
                        {returnDate && isReturn
                            && <DatePicker
                                label="Ngày về"
                                startDate={new Date()}
                                value={returnDate}
                                placeholder={parseString(returnDate)}
                                onChange={setReturnDate}
                            />
                        }
                    </Box>
                    <Box className="flex justify-end">
                        <Switch
                            checked={isReturn}
                            onChange={handleSwitch}
                            label="Khứ hồi"
                        />
                    </Box>
                </Box>


                {/* Search button */}
                <Box className="flex justify-center items-center">
                    <Button
                        onClick={handleSearch}
                        type="danger"
                        size="medium"
                        className="w-full sm:w-auto"
                        suffixIcon={<Icon icon="zi-search" />}
                    >
                        Tìm Chuyến
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchArea;


