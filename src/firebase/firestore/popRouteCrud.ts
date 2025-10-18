import { db } from "@/firebase/fireConfig";
import { PopRoute } from "@/types/routeType";
import {
    getDocs,
    collection,
} from "firebase/firestore";


const colRef = collection(db, "popRoutes")

export async function getPopRoutes() {
    try {
        const snap = await getDocs(colRef);
        const data = snap.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<PopRoute, "id">), // ép kiểu cho TS
        }));
        return data;
    } catch (error) {
        console.error("[FIRESTORE ERROR] getPopRoutes failed:", error);
        return [];
    }
}