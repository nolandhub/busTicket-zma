import { atom, selector } from "recoil";
import { userCached } from "./types/userInfo";

export const userState = atom<userCached | null>({
    key: "userInfo",
    default: null
});


