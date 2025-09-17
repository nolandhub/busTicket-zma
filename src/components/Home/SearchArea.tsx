import { useEffect, useState } from "react";
import DateInput from "@/components/common/inputs/DatePicker";
import SwapButton from "@/components/common/buttons/SwapButton";
import ActionButton from "../common/buttons/ActionButton";
import { MapPin, Locate } from "lucide-react";
import { useLocation, useNavigate } from "zmp-ui";
import { toast } from "react-toastify";
import { formatDate } from "@/util/formatDate"
import { buildURL } from "@/util/buildURL";
import { getLabelFromValue } from "@/util/getLabelFromValue";
import InputPicker from "../common/inputs/InputPicker"
const SearchArea = () => {
    const [departure, setDeparture] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    const fromLabel = getLabelFromValue(departure)
    const toLabel = getLabelFromValue(destination)

    //back data no retype/////////////
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const urlDeparture = params.get("from") || "";
    const urlDestination = params.get("to") || "";
    const urlDate = params.get("date") || "";
    ///////////////////////////////////////

    const navigate = useNavigate()

    const handleSwap = () => {
        setDeparture(destination);
        setDestination(departure);
    };


    const handleSearch = async () => {
        if (!departure || !destination || !date) {
            toast.info("Vui lòng nhập đầy đủ thông tin!", { autoClose: 800 });
            return;
        }

        const url = buildURL("/availableTrip", {
            from: departure,
            to: destination,
            date: formatDate(date),
            fromLabel: fromLabel,
            toLabel: toLabel
        })
        navigate(url)

    };

    const parseDateFromParam = (dateStr: string): Date | null => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split("-");
        const d = new Date(Number(year), Number(month) - 1, Number(day));
        return d;
    };

    //Check url backHome to set Departure,Destination,Date 

    useEffect(() => {
        const checkURL = () => {
            if (urlDeparture === "" && urlDestination === "" && urlDate === "") return;
            else {
                setDeparture(urlDeparture);
                setDestination(urlDestination);

                if (urlDate) {
                    const parsedDate = parseDateFromParam(urlDate);
                    if (parsedDate) {
                        setDate(parsedDate); // DatePicker Zalo nhận Date object luôn
                    }
                }
            }

        }
        checkURL()
    }, [])


    return (
        <div className="p-4 flex justify-center shadow-lg">
            <div className="border border-gray-400 rounded-2xl  flex flex-col md:flex-row items-stretch px-4 py-6 gap-4 w-full max-w-5xl relative">


                <div className="flex-1 relative flex items-center gap-2">
                    {/* Ô chọn nơi đi */}
                    <div className="flex-1">
                        <InputPicker
                            icon={<MapPin size={30} color="blue" strokeWidth={2} />}
                            tittle="Chọn nơi đi"
                            value={departure}
                            placeholder="Nơi đi"
                            onChange={(val) => setDeparture(val.suggestions.value as string)}
                        />
                    </div>

                    {/* Nút swap nằm giữa */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <SwapButton onClick={handleSwap} />
                    </div>

                    {/* Ô chọn nơi đến */}
                    <div className="flex-1">
                        <InputPicker
                            icon={<Locate size={30} color="red" strokeWidth={2} />}
                            tittle="Chọn nơi đến"
                            value={destination}
                            placeholder="Nơi đến"
                            onChange={(val) => setDestination(val.suggestions.value as string)}
                        />
                    </div>
                </div>


                {/* Date input */}
                <div className="flex-1">
                    <DateInput value={date} onChange={setDate} />
                </div>

                {/* Search Area */}
                <div className="flex justify-center items-center">
                    <ActionButton
                        shade="600"
                        color="red"
                        label="Tìm Chuyến"
                        onClick={handleSearch}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchArea;


