import { Ticket } from "@/types/bookingType";
import { db } from "../fireConfig";
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import { generateTicketId } from "@/helper/generateID";

const ref = collection(db, "tickets")


export async function addTicket(data: Ticket) {
    try {
        const id = data.id
        const refDoc = doc(db, "tickets", id)
        await setDoc(refDoc, data)

    } catch (error) {
        console.log("[firestore] addTicket " + error)
    }

}