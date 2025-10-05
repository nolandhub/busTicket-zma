import { db } from "@/firebase/fireConfig";
import { Trip } from "@/types/tripType";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import mockTrips from "@/mock/mockTrip.json"
const ref = collection(db, "trips")

export async function seedTrip() {
    for (const trip of mockTrips) {
        try {
            const docRef = await addDoc(ref, trip);
            console.log("Đã tạo trip với ID:", docRef.id);
        } catch (error) {
            console.error("Lỗi khi tạo trip:", error);
        }
        console.log("done mock trip")

    }
}

export async function getTrip2WayAvailable(routeId: string): Promise<Trip[]> {
    const { directKey, reverseKey } = buildRouteKey(routeId);

    const ref = collection(db, "trips");

    // First, try querying with direct key
    const directQuery = query(ref, where("routeId", "==", directKey), where("isDelete", "==", false));
    const directSnapshot = await getDocs(directQuery);

    // If direct query has results, return them
    if (!directSnapshot.empty) {
        return directSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Trip, "id">)
        }));
    }

    // If no results with direct key, try reverse key
    const reverseQuery = query(ref, where("routeId", "==", reverseKey), where("isDelete", "==", false));
    const reverseSnapshot = await getDocs(reverseQuery);

    return reverseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Trip, "id">)
    }));
}

export function buildRouteKey(routeId: string) {
    const [split1, split2] = routeId.split("-").map(String)
    const directKey = `${split1}-${split2}`
    const reverseKey = `${split2}-${split1}`

    return { directKey, reverseKey }
}
