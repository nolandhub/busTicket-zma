import { db } from "@/firebase/fireConfig";
import { tripMock } from "@/pages/AvailabeTrip";
import { Trip } from "@/types/tripType";
import { getDoc, doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";


const ref = collection(db, "trips")

export async function getAvaiLableTrip(id: string): Promise<Trip[]> {
    try {
        const q = query(ref, where("routeId", "==", id))
        const snapShot = await getDocs(q)

        return snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as Omit<Trip, "id">
        }))
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function seedTrip() {
    try {
        await addDoc(ref, { ...tripMock, createdAt: new Date() })
        console.log("add success")
    } catch (error) {
        console.log("add Fail")
        console.log(error)
    }

}