import { FC } from "react";
import { Header, useNavigate } from "zmp-ui";

interface BackHeaderProps {
    title: string | React.ReactNode;
    backTo?: string;
    backSearchParams?: Record<string, string>;
}

const BackHeader: FC<BackHeaderProps> = ({ title, backTo, backSearchParams }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backTo) {
            const search = backSearchParams
                ? '?' + new URLSearchParams(backSearchParams).toString()
                : '';
            navigate(`${backTo}${search}`);
        } else {
            navigate(-1);
        }
    };
    return (
        <Header
            title={title}
            showBackIcon
            onBackClick={handleBack}
            backgroundColor="#ECFCCB"
            className=""
        />
    );
};

export default BackHeader;
