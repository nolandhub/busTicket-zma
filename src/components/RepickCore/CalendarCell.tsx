// components/CalendarCell.tsx
import { Box } from "zmp-ui";

export default function CalendarCell({
    date,
    info,
    departDate,
    returnDate,
}: {
    date: Date;
    info: any;
    departDate: Date;
    returnDate?: Date | null;
}) {
    if (info?.type !== "date") {
        return info.originNode || null;
    }

    const d = date.toDateString();
    const dateNumber = date.getDate();

    if (d === departDate.toDateString()) {
        return <Circle number={dateNumber} variant="success" />;
    }

    if (returnDate && d === returnDate.toDateString()) {
        return <Circle number={dateNumber} variant="success" />;
    }

    if (returnDate && date > departDate && date < returnDate) {
        return <Circle number={dateNumber} variant="range" />;
    }

    return (
        <Box className="w-8 h-8 flex items-center justify-center">
            {dateNumber}
        </Box>
    );
}

function Circle({
    number,
    variant,
}: {
    number: number;
    variant: "success" | "range";
}) {
    const styles =
        variant === "success"
            ? "bg-green-500 text-white"
            : "bg-green-200 text-green-800";
    return (
        <Box className="w-8 h-8 flex items-center justify-center relative">
            <div
                className={`${styles} rounded-full w-8 h-8 flex items-center justify-center font-medium`}
            >
                {number}
            </div>
        </Box>
    );
}
