import { ArrowRightLeft, ArrowUpDown } from "lucide-react";
import { Box } from "zmp-ui";

interface Props {
    onClick: () => void;
}

const SwapButton = ({ onClick }: Props) => (
    <Box
        onClick={onClick}
        className="p-2 rounded-full border border-gray-300 bg-yellow-400"
    >
        {/* Mặc định (<640px): icon dọc */}
        <ArrowUpDown size={20} color="white" className="block sm:hidden" />
        {/* Từ 640px trở lên: icon ngang */}
        <ArrowRightLeft size={20} color="white" className="hidden sm:block" />
    </Box>
);

export default SwapButton;
