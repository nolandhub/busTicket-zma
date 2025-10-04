import { Trip } from "@/types/tripType";
import dayjs from "dayjs";

export function getSuitableTimesForDate(trip: Trip[], date: Date) {
    const now = dayjs();
    const cnvDayjs = dayjs(date)

    if (cnvDayjs.isSame(now, "day")) {
        return trip.filter(tripItem => {
            const [hour, minute] = tripItem.startTime.split(":").map(Number);
            const tripDateTime = cnvDayjs.set("hour", hour).set("minute", minute).set("second", 0);
            return tripDateTime.diff(now, "minute") >= 60;
        });
    }

    // For future dates, always show
    return trip.filter(tripItem => {
        const [hour, minute] = tripItem.startTime.split(":").map(Number);
        const tripDateTime = cnvDayjs.set("hour", hour).set("minute", minute).set("second", 0);
        return tripDateTime.isAfter(now);
    });
}

