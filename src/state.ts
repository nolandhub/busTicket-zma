import { atom, selector } from "recoil";
import { userCached } from "./types/userType";
import { PopRoute } from "./types/routeType";
import { getPopRoutes } from "./firebase/firestore/popRouteCrud";
import { TripFiltered } from "./types/tripType";
import { getSuitableTimesForDate } from "./helper/filterTime";
import { getTrip2WayAvailable } from "./firebase/firestore/tripCrud";

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



export const tripAvailable = selector<TripFiltered[]>({
    key: "availableTrip",
    get: async ({ get }) => {
        const routeId = get(routeIdState)
        const departureDate = get(departureDateState)
        const departureKey = get(departureState)

        if (!routeId) return [];

        const trips = await getTrip2WayAvailable(routeId);

        const tripsFiltered: TripFiltered[] = trips.map(trips => {
            const isForward = trips.routeConfig.forward.key == departureKey
            return {
                ...trips,
                activePickDrop: isForward ? trips.routeConfig.forward : trips.routeConfig.backward
            }
        });
        const tripFilter = getSuitableTimesForDate(tripsFiltered, departureDate)
        return tripFilter
    },
});


