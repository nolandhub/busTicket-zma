import { db } from "@/firebase/fireConfig";
import { BusCompany } from "@/types/busCompanyType";
import {
    getDocs,
    collection,
} from "firebase/firestore";



const colRef = collection(db, "companies")

export async function getCompanies() {
    try {
        const snap = await getDocs(colRef);
        const data = snap.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<BusCompany, "id">)
        }));
        return data;
    } catch (error) {
        console.error("[FIRESTORE ERROR] getPopRoutes failed:", error);
        return [];
    }
}