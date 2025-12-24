import { FC, useEffect } from "react";
import { showFunctionButtonWidget } from "zmp-sdk/apis";
import { Button, useSnackbar } from "zmp-ui";

interface props {
    loading?: boolean
    onOrder: (messageToken) => void
}

export const ButtonOrder: FC<props> = ({ onOrder }) => {
    const snackBar = useSnackbar()
    useEffect(() => {
        showFunctionButtonWidget({
            id: "orderButton",
            type: "ORDER",
            text: "Đặt xe",
            color: "#258344",
            onDataReceived: (messageToken) => {
                onOrder(messageToken)

                snackBar.openSnackbar({
                    type: "success",
                    text: "Vé của bạn đã được tiếp nhận, Cảm ơn bạn !",
                });
            },
            onError: (error) => {
                console.error("onError:", error);
            },
        });
    }, []);

    return (
        <>
            <Button className="animate-bounce w-[200px]" id="orderButton" />
        </>
    );
}



export default ButtonOrder