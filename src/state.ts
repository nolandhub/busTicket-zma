import { atom, selector } from "recoil";
import { userCached } from "./types/userType";
import { PopRoute } from "./types/routeType";
import { getPopRoutes } from "./firebase/firestore/popRouteCrud";
import { PriceDetail, Trip, TripFiltered } from "./types/tripType";
import { BusCompany } from "./types/busCompanyType";
import { BookingData, TicketData } from "./types/bookingType";
import mockTrip from "@/mock/mockTrip.json"
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

export const busCompanyState = atom<BusCompany[]>(
    {
        key: 'busCompany',
        default: []
    }
)

export const tripState = atom<Trip[]>({
    key: "trip",
    default: []
})

export const controlReturnState = atom<boolean>({
    key: "controlReturn",
    default: false
})

export const selectedTripState = atom<TripFiltered | null>({
    key: "selectedTrip",
    default: null
})

export const selectedCompanyState = atom<BusCompany | null>({
    key: "selectedBus",
    default: null
})


//Fixed bug overlay ImageViewer
export const hideHeaderState = atom<boolean>({
    key: "hideHeader",
    default: false
})

export const priceOptionState = atom<PriceDetail | null>({
    key: "priceOption",
    default: null
})

export const bookingState = atom<BookingData | null>({
    key: "booking",
    default: null
})

export const ticketState = atom<TicketData[]>({
    key: "ticket",
    default: []
})

export const popRouteState = selector<PopRoute[]>({
    key: "popRoutes",
    get: async () => {
        const res = await getPopRoutes();
        return res;
    },
});

export const availableTrip = selector<TripFiltered[]>({
    key: "availableTrip",
    get: ({ get }) => {
        const departureKey = get(departureState)
        const trips = get(tripState)

        if (!trips) return [];

        const tripsFiltered: TripFiltered[] = trips.map(trips => {
            const isForward = trips.routeConfig.forward.key == departureKey //check forward/backward
            return {
                ...trips,
                activePickDrop: isForward ? trips.routeConfig.forward : trips.routeConfig.backward
            }
        });
        return tripsFiltered
    }
});


