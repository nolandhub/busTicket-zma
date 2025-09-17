import { icons } from "lucide-react";
import React, { useEffect } from "react";
import { showFunctionButtonWidget } from "zmp-sdk/apis";
import { Icon, useNavigate, useSnackbar } from "zmp-ui";


function buttonOrder() {
    const snackBar = useSnackbar()
    useEffect(() => {
        showFunctionButtonWidget({
            id: "orderButton",
            type: "ORDER",
            text: "Đặt hàng",
            color: "#0068FF",
            textColor: "#FFFFFF",
            borderRadius: "48px",
            onDataReceived: (messageToken) => {
                console.log(messageToken);
                snackBar.openSnackbar({
                    type: "success",
                    text: "Order của bạn đã được tiếp nhận, Cảm ơn bạn !",
                });
            },
            onError: (error) => {
                console.error("onError:", error);
            },
        });
    }, []);

    return (
        <>
            ...
            <div id="orderButton" />
            ...
        </>
    );
}



export default buttonOrder