import { Ticket } from "@/types/bookingType";
import { db } from "../fireConfig";
import { collection, doc, setDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { ticketState, userState } from "@/state";
import { useEffect, useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";

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


export async function updateTicket(id: string, data) {
    try {
        const ref = doc(db, "tickets", id);
        await updateDoc(ref, data);
        return { success: true };
    } catch (error) {
        console.error("[FIRESTORE ERROR] updateUser failed:", error);
        return { success: false, error };
    }
}


export function useSubcribeTicket() {
    const [loadingTicket, setLoadingTicket] = useState<boolean>(true)
    const setTicketAtom = useSetRecoilState(ticketState)
    const { userData } = useUserInfo()

    useEffect(() => {
        if (!userData) {
            setTicketAtom([])
            setLoadingTicket(false)
            return
        }

        const q = query(ref,
            where("zaloId", "==", userData.id),
            where("isDelete", "==", false),
        )
        const unSub = onSnapshot(q, (snapShot) => {
            const tickets = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as Omit<Ticket, "id">
            }))
            setTicketAtom(tickets)
            setLoadingTicket(false)
        },
            (error) => {
                console.error("[firestore] onSnapshot error:", error)
                setTicketAtom([])
                setLoadingTicket(false)
            }
        )
        return () => unSub()
    }, [loadingTicket, setTicketAtom])

    return {
        loadingTicket
    }
}