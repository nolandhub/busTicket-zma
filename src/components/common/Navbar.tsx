import { BottomNavigation, Box, useLocation, useNavigate } from "zmp-ui";
import { Icon } from "zmp-ui"
import { useState } from "react";


const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeKey, setActiveKey] = useState(location.pathname);

    function handleChange(key: string) {
        setActiveKey(key)
        navigate(key)
    }

    return (
        <BottomNavigation
            fixed
            className="z-50"
            defaultActiveKey="/"
            activeKey={activeKey}
            onChange={handleChange}
        >
            <BottomNavigation.Item
                key={"/"}
                icon={<Icon icon="zi-home" />}
                label="Trang Chủ"
            />
            <BottomNavigation.Item
                key={"/ticket"}
                icon={<Icon icon="zi-favorite-list" />}
                label="Xem Vé"
            />
            <BottomNavigation.Item
                key={"/gift"}
                icon={<Icon icon="zi-bookmark" />}
                label="Quà Tặng"
            />
            <BottomNavigation.Item
                key={"/profile"}
                icon={<Icon icon="zi-user" />}
                label="Tài Khoản"
            />
        </BottomNavigation>
    );
};

export default BottomNav;

