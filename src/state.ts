import { atom, selector, useRecoilValue } from "recoil";
import { UserCached } from "./types/userType";
import { PopRoute } from "./types/routeType";
import { getPopRoutes } from "./firebase/firestore/popRouteCrud";
import { PriceDetail, Trip, TripFiltered } from "./types/tripType";
import { BusCompany } from "./types/busCompanyType";
import { BookingData, Ticket } from "./types/bookingType";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase/fireConfig";
import { nativeStorage } from "zmp-sdk";

export const userState = atom<UserCached | null>({
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

// export const tripLoadingState = atom<boolean>({
//     key: 'tripLoadingState',
//     default: true  // Mặc định là đang loading
// });


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

export const bookingState = atom<BookingData>({
    key: "booking",
    default: {
        bookingId: "",
        zaloId: "",
        compId: "",
        compName: "",
        busName: "",
        tripId: "",
        routeName: "",
        bookingDate: "",
        bookingName: "",
        bookingPhone: "",
        option: [],
        total: 0,
        totalPassCount: 0,
        pickUp: null,
        dropOff: null,
        pickUpValue: "",
        dropOffValue: "",
        pickUpNote: "",
        dropOffNote: "",
        isDelete: false
    },
})

export const ticketState = atom<Ticket[]>({
    key: "ticket",
    default: [],
});

export const popRouteState = selector<PopRoute[]>({
    key: "popRoutes",
    get: async () => {
        const res = await getPopRoutes();
        return res;
    },
});

export const isRegisteredState = atom<boolean>({
    key: "isRegistered",
    default: false
})

export const availableTrip = selector<TripFiltered[]>({
    key: "availableTrip",
    get: ({ get }) => {
        const departureKey = get(departureState)
        const trips = get(tripState)

        if (!trips) return [];

        const tripsFiltered: TripFiltered[] = trips.map(trips => {
            const isForward = trips.tripConfig.forward.key == departureKey //check forward/backward
            return {
                ...trips,
                activePickDrop: isForward ? trips.tripConfig.forward : trips.tripConfig.backward
            }
        });
        return tripsFiltered
    }
});


