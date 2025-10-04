import { atom, selector, selectorFamily } from "recoil";
import { userCached } from "./types/userType";
import { PopRoute } from "./types/routeType";
import { getPopRoutes } from "./firebase/firestore/popRouteCrud";
import { Trip } from "./types/tripType";
import { getAvaiLableTrip } from "@/firebase/firestore/tripCrud";
import { getSuitableTimesForDate } from "./helper/filterTime";


export const userState = atom<userCached | null>({
    key: 'user',
    default: null
});

export const departureState = atom<string>({
    key: 'departure',
    default: '',
});

export const destinationState = atom<string>({
    key: 'destination',
    default: '',
});

export const departureDateState = atom<Date>({
    key: 'departureDate',
    default: new Date(),
});

export const returnDateState = atom<Date | null>({
    key: 'returnDate',
    default: null
});

export const isReturnState = atom<boolean>({
    key: 'isReturn',
    default: false,
});

export const popRouteState = selector<PopRoute[]>({
    key: "popRoutes",
    get: async () => {
        const res = await getPopRoutes();
        return res;
    },
});

export const routeIdState = atom<string>({
    key: "routeId",
    default: "",
});



export const tripAvailable = selector<Trip[]>({
    key: "availableTrip",
    get: async ({ get }) => {
        const routeId = get(routeIdState)
        const departureDate = get(departureDateState)
        if (!routeId) return [];

        const trip = await getAvaiLableTrip(routeId);

        const tripFilter = getSuitableTimesForDate(trip, departureDate)

        return tripFilter

    },
});


