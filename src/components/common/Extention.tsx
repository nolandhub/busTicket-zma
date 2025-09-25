import { FC, ReactNode } from "react";

interface Props {
    icon: ReactNode;
    label: string;
}

const LabelWithIcon: FC<Props> = ({ icon, label }) => {
    return (
        <div className="flex items-center space-x-1">
            <span>{icon}</span>
            <span className="text-xs font-semibold">{label}</span>
        </div>
    );
};

export default LabelWithIcon;
