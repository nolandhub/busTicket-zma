import { BottomNavigation, Box, useLocation, useNavigate } from "zmp-ui";
import { Icon } from "zmp-ui"
import { useMemo, useState } from "react";
import { useVirtualKeyboardVisible } from "@/hooks/hookHelper";
/////////////////Remember Me/////////////////////////////////
/*  Custom hide navBar for special page */
export const NO_BOTTOM_NAVIGATION_PAGES =
    [
        "/availableTrip",




        /* Add another page that you dont want to show navBar */
    ];


/*  Custom hide navBar for special page */
/////////////////Remember Me/////////////////////////////////

const BottomNav = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname);
    const keyboardVisible = useVirtualKeyboardVisible();
    const navigate = useNavigate();

    const noBottomNav = useMemo(() => {
        return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
    }, [location]);

    if (noBottomNav || keyboardVisible) {
        return <></>;
    }

    function handleChange(key: string) {
        setActiveKey(key)
        navigate(key)
    }

    return (
        <BottomNavigation
            fixed
            className="z-50"
            activeKey={activeKey}
            onChange={(key) => handleChange(key)}
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

