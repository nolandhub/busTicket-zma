import { Trip } from "@/types/tripType";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/fireConfig";

export default async function findTripByFromTo(from: string, to: string): Promise<Trip[]> {
    const directKey = buildRouteKey(from, to);
    const reverseKey = buildRouteKey(to, from);

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

export function buildRouteKey(a: string, b: string): string {
    return `${a.trim().toLowerCase()}-${b.trim().toLowerCase()}`;
}