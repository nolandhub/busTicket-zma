import { db } from "@/firebase/fireConfig";
import { BusCompany } from "@/types/busCompanyType";
import {
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    collection,
} from "firebase/firestore";

const colRef = collection(db, "companies")

export async function getCompanies() {
    try {
        const snap = await getDocs(colRef);
        const data = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), // ép kiểu cho TS
        }));
        return data;
    } catch (error) {
        console.error("[FIRESTORE ERROR] getPopRoutes failed:", error);
        return [];
    }
}