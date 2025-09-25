import { useNavigate } from "zmp-ui"
import useCoreInit from "./useCoreInit";
import { useState } from "react";

export default function useRepickCore() {
    const { departDate,
        isReturn,
        returnDate,
        setReturnDate,
        setDepartDate,
        setIsReturn,
        resetReturnDate,
    } = useCoreInit();

    const navigate = useNavigate()

    const [open, setOpen] = useState<boolean>(true) //active confirm button

    function handleChange() {
        resetReturnDate()
        setIsReturn(!isReturn)
        setOpen(false)
    }

    const handleBack = () => {
        if (isReturn || returnDate) {
            resetReturnDate()
            setIsReturn(false)
            navigate("/")
        }
        resetReturnDate()
        setIsReturn(false)
        navigate("/")
    }

    const handleClick = () => {
        if (!isReturn) {
            resetReturnDate()
            navigate(-1)
        } else {
            navigate(-1)
        }

    }

    const handleLogicDate = (date: Date) => {
        //Swap Date
        if (!returnDate) {
            if (date < departDate) {
                setDepartDate(date)
                setReturnDate(departDate)
                setOpen(false)
            } else if (date > departDate) {
                setReturnDate(date)
                setOpen(false)
            }
        }// reset start new departDate
        else if (departDate && returnDate) {
            setDepartDate(date)
            resetReturnDate()
            setOpen(true)
        }
    }

    return {
        open,
        setOpen,
        handleLogicDate,
        handleBack,
        handleClick,
        handleChange,
    }
}
