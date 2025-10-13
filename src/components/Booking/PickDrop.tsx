import { FC, useState, useEffect } from "react";

interface BasePickDrop {
    title: string;
    subTitle: string;
    time: string;
}

interface PickDropProps {
    pickUp: BasePickDrop[];
    dropOff: BasePickDrop[];
    onSelectionChange?: (pickup: BasePickDrop | null, dropoff: BasePickDrop | null) => void;
}

const PickDrop: FC<PickDropProps> = ({ pickUp, dropOff, onSelectionChange }) => {
    const [selectedPickup, setSelectedPickup] = useState<number | null>(null);
    const [selectedDropoff, setSelectedDropoff] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"pickup" | "dropoff">("pickup");

    useEffect(() => {
        const pickup = selectedPickup !== null ? pickUp[selectedPickup] : null;
        const dropoff = selectedDropoff !== null ? dropOff[selectedDropoff] : null;
        onSelectionChange?.(pickup, dropoff);
    }, [selectedPickup, selectedDropoff]);

    const handlePickupSelect = (index: number) => {
        setSelectedPickup(index);
        setTimeout(() => setActiveTab("dropoff"), 300);
    };

    const handleDropoffSelect = (index: number) => {
        setSelectedDropoff(index);
    };

    return (
        <div className="bg-white rounded shadow">
            {/* Tabs */}
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab("pickup")}
                    className={`flex-1 p-3 text-sm min-w-0 transition-all duration-300 ${activeTab === "pickup" ? "border-b-2 border-green-500 bg-green-50" : ""
                        }`}
                >
                    <div className="font-bold">ĐIỂM ĐÓN</div>
                    <div className="mt-1 break-words">
                        {selectedPickup !== null ? pickUp[selectedPickup]?.subTitle : "Chọn điểm đón"}
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("dropoff")}
                    className={`flex-1 p-3 text-sm min-w-0 transition-all duration-300 ${activeTab === "dropoff" ? "border-b-2 border-blue-500 bg-blue-50" : ""
                        }`}
                >
                    <div className="font-bold">ĐIỂM TRẢ</div>
                    <div className="mt-1 break-words">
                        {selectedDropoff !== null ? dropOff[selectedDropoff]?.subTitle : "Chọn điểm trả"}
                    </div>
                </button>
            </div>

            {/* Content with scroll */}
            <div className="max-h-96 overflow-y-auto">
                {activeTab === "pickup" && (
                    <div>
                        {pickUp.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handlePickupSelect(index)}
                                className={`flex p-4 border-b cursor-pointer transition-colors ${selectedPickup === index ? "bg-green-50" : "hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    className="mt-1 mr-3"
                                    name="pickup"
                                    checked={selectedPickup === index}
                                    onChange={() => handlePickupSelect(index)}
                                />
                                <div className="flex-1 flex items-center gap-4">
                                    <div className="font-medium text-sm">{item.time}</div>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">{item.subTitle}</div>
                                        <div className="text-gray-500 text-sm mt-1">{item.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "dropoff" && (
                    <div>
                        {dropOff.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleDropoffSelect(index)}
                                className={`flex p-4 border-b cursor-pointer transition-colors ${selectedDropoff === index ? "bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    className="mt-1 mr-3"
                                    name="dropoff"
                                    checked={selectedDropoff === index}
                                    onChange={() => handleDropoffSelect(index)}
                                />
                                <div className="flex-1 flex items-center gap-4">
                                    <div className="font-medium text-sm">{item.time}</div>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">{item.subTitle}</div>
                                        <div className="text-gray-500 text-sm mt-1">{item.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PickDrop