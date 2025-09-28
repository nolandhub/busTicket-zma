import { atom, selector } from "recoil";
import { userCached } from "./types/userType";
import { PopRoute } from "./types/routeType";
import { getPopRoutes } from "./firebase/firestore/popRouteCrud";
import { Trip } from "./types/tripType";

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


// export const rootIdState = atom<string | null>({
//     key: "rootId",
//     default: null
// })


// export const tripState = selector<Trip[]>({
//     key: "trips",
//     get: async ({ get }) => {
//         const rootId = get(rootIdState)
//         if (!rootId) return []

//         const res = await getTripsById(rootId)
//         return res
//     }
// })
