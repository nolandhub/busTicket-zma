import { Box, Text } from "zmp-ui";
import RouteIndicator from "./RouteIndicatorIcon";
import { Zap } from "lucide-react";



export function TripItem() {
    return (
        <Box className="bg-white rounded-xl border border-slate-300">
            {true && (
                <Box className="flex justify-between rounded-ss-xl rounded-se-xl border-b border-b-stone-200 bg-white">
                    <div className="flex w-1/2 justify-center rounded-ee-full border border-indigo-400 bg-blue-500 p-1">
                        <div className="flex items-center gap-1">
                            <Zap size={22} strokeWidth={1.5} fill="yellow" color="yellow" />
                            <Text size="xLarge" bold className="text-slate-50">
                                Flash Sale
                            </Text>
                        </div>
                    </div>

                    <div className="flex w-1/2 items-center justify-center rounded-se-xl bg-white p-1">
                        <Text bold size="small" className="text-blue-600">
                            Kết thúc sau ...
                        </Text>
                    </div>
                </Box>
            )}

            <Box className="rounded-t-xl rounded-b-xl bg-white p-2 py-4 shadow-lg">
                <RouteIndicator defStart="New York" defEnd="Mandive" />
            </Box>
        </Box>


    );
}
