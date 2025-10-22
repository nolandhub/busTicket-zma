import { FC, useEffect } from "react";
import { showFunctionButtonWidget } from "zmp-sdk/apis";
import { useSnackbar } from "zmp-ui";

interface props {
    onOrder: (messageToken) => void
}

const buttonOrder: FC<props> = ({ onOrder }) => {
    const snackBar = useSnackbar()
    useEffect(() => {
        showFunctionButtonWidget({
            id: "orderButton",
            type: "ORDER",
            text: "Đặt xe",
            color: "#0068FF",
            textColor: "#FFFFFF",
            borderRadius: "48px",
            onDataReceived: (messageToken) => {
                onOrder(messageToken)

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