import { atom, selector } from "recoil";
import { userCached } from "./types/userInfo";
import { popRoute } from "./types/poproutes";

import { getPopRoutes } from "./firebase/firestore/popRouteCrud";

export const userState = atom<userCached | null>({
    key: 'userState',
    default: null
});

export const departureState = atom<string>({
    key: 'departureState',
    default: '',
});

export const destinationState = atom<string>({
    key: 'destinationState',
    default: '',
});

export const dateState = atom<Date>({
    key: 'dateState',
    default: new Date(),
});


// export const productsState = selector<PopRoute[]>();


export const popRouteState = selector<popRoute[]>({
    key: "popRoutes",
    get: async () => {
        const res = await getPopRoutes();
        return res; // chắc chắn đúng type PopRoute[]
    },
});
