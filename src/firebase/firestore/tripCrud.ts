import { db } from "@/firebase/fireConfig";
import { Trip } from "@/types/tripType";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getTrip2WayAvailable(routeId: string): Promise<Trip[]> {
    const { directKey, reverseKey } = buildRouteKey(routeId);

    const ref = collection(db, "trips");

    // First, try querying with direct key
    const directQuery = query(ref, where("routeId", "==", directKey));
    const directSnapshot = await getDocs(directQuery);

    // If direct query has results, return them
    if (!directSnapshot.empty) {
        return directSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Trip, "id">)
        }));
    }

    // If no results with direct key, try reverse key
    const reverseQuery = query(ref, where("routeId", "==", reverseKey));
    const reverseSnapshot = await getDocs(reverseQuery);

    return reverseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Trip, "id">)
    }));
}

export function buildRouteKey(routeId: string) {
    const [key1, key2] = routeId.split("-").map(String)
    const directKey = `${key1}-${key2}`
    const reverseKey = `${key2}-${key1}`

    return { directKey, reverseKey }
}
