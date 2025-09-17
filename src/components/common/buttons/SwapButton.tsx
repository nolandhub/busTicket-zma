import { ArrowRightLeft } from "lucide-react";

interface Props {
    onClick: () => void;
}

const SwapButton = ({ onClick }: Props) => (
    <div
        className="p-2 bg-white rounded-full border shadow cursor-pointer hover:text-blue-600 z-10"
        onClick={onClick}
    >
        <ArrowRightLeft size={20} />
    </div>
);

export default SwapButton;
