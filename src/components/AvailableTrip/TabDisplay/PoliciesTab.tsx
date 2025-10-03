import { Policies } from "@/types/busCompanyType";
import { FC } from "react";
import { Box, Text } from "zmp-ui";

interface Props {
    policies: Policies[];
}

const PoliciesTab: FC<Props> = ({ policies }) => {
    return (
        <Box className="space-y-4">
            {policies.map((policy, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden">
                    <div className="bg-green-600 px-4 py-2">
                        <Text className="text-white font-semibold">{policy.title}</Text>
                    </div>
                    <div className="p-4 space-y-2">
                        {policy.description.map((desc, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <Text className="text-gray-700 flex-1">{desc}</Text>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default PoliciesTab