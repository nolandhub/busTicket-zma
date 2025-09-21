import { db } from "@/firebase/fireConfig";
import { coreData } from "@/types/userType";
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    collection,
} from "firebase/firestore";

const USER_COLLECTION = "users";

export async function addUser(id: string, data: coreData) {
    try {
        const userId = id;
        const ref = doc(db, USER_COLLECTION, userId);
        await setDoc(ref, data, { merge: true }); // an toàn khi cập nhật
        return { success: true };
    } catch (error) {
        console.error("[FIRESTORE ERROR] addUser failed:", error);
        return { success: false, error };
    }
}

export async function getUserById(id: string) {
    try {
        const ref = doc(db, USER_COLLECTION, id);
        const snap = await getDoc(ref);
        return snap.exists() ? { id, ...snap.data() } : null;
    } catch (error) {
        console.error("[FIRESTORE ERROR] getUserById failed:", error);
        return null;
    }
}

export async function getAllUsers() {
    try {
        const ref = collection(db, USER_COLLECTION);
        const snap = await getDocs(ref);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("[FIRESTORE ERROR] getAllUsers failed:", error);
        return [];
    }
}

export async function updateUser(id: string, data: Partial<coreData>) {
    try {
        const ref = doc(db, USER_COLLECTION, id);
        await updateDoc(ref, data);
        return { success: true };
    } catch (error) {
        console.error("[FIRESTORE ERROR] updateUser failed:", error);
        return { success: false, error };
    }
}
