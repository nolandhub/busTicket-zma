import DateInput from "@/components/common/inputs/DatePicker";
import { MapPin, Locate, ArrowUpDown } from "lucide-react";
import { Box, Button } from "zmp-ui";
import InputPicker from "../common/inputs/InputPicker";
import useSearch from "@/hooks/useSearch";

const SearchArea = () => {
    const {
        handleSearch,
        handleSwap,
        departure,
        destination,
        date,
        setDeparture,
        setDestination,
        setDate,
    } = useSearch();

    return (
        <Box className="p-4 flex justify-center">
            <Box className="w-full max-w-5xl border border-gray-200 rounded-2xl shadow-lg bg-white p-4 md:p-6 flex flex-col md:flex-row gap-4">

                {/* Departure + Swap + Destination */}
                <Box className="flex-1 flex flex-col sm:flex-row items-stretch gap-3">
                    <Box className="flex-1">
                        <InputPicker
                            icon={<MapPin size={24} color="red" strokeWidth={2} />}
                            tittle="Chọn nơi đi"
                            value={departure}
                            placeholder="Nơi đi"
                            onChange={(val) => setDeparture(val.suggestions.value as string)}
                        />
                    </Box>

                    <Box className="flex items-center justify-center sm:w-auto">
                        <Box
                            onClick={handleSwap}
                            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center "
                        >
                            <ArrowUpDown
                                size={18}
                                className="text-gray-800 transform transition-transform duration-200 md:rotate-90"
                            />
                        </Box>
                    </Box>

                    <Box className="flex-1">
                        <InputPicker
                            icon={<Locate size={24} color="green" strokeWidth={2} />}
                            tittle="Chọn nơi đến"
                            value={destination}
                            placeholder="Nơi đến"
                            onChange={(val) => setDestination(val.suggestions.value as string)}
                        />
                    </Box>
                </Box>

                {/* Date input */}
                <Box className="flex-1">
                    <DateInput value={date} onChange={setDate} placeholder="Chọn ngày đi" />
                </Box>

                {/* Search button */}
                <Box className="flex justify-center items-center">
                    <Button
                        onClick={handleSearch}
                        type="danger"
                        size="medium"
                        className="w-full sm:w-auto"
                    >
                        Tìm Chuyến
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchArea;


