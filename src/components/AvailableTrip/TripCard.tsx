import { Bus } from "lucide-react";
import { Box, Text, useLocation } from "zmp-ui";





export default function TripCard() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get('from') || '';
    const to = params.get('to') || '';
    const date = params.get('date') || '';
    const fromLabel = params.get('fromLabel') || '';
    const toLabel = params.get('toLabel') || '';


    return (
        <Box className="max-w-2xl mx-auto mt-2 p-2 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
                {/* Route */}
                <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-md">
                        <Bus className="w-8 h-8 text-white transform" />
                    </div>
                    <div>
                        <Text bold className="font-bold text-gray-800">
                            {fromLabel} → {toLabel}
                        </Text>
                        <Text bold size="small" className="text-gray-500">PROBUS</Text>
                    </div>
                </div>

                {/* Date */}
                <div className="text-right">
                    <Text className="text-gray-400 text-sm font-medium mb-1">Date</Text>
                    <Text className="text-xl font-bold text-gray-800">
                        {date}
                    </Text>
                </div>
            </div>
            {/* Decorative line */}
            <div className="mt-4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"></div>
        </Box>
    )

}
