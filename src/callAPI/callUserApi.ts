import { storedData } from "@/types/userInfo";

export default async function callAddUser(data: storedData) {
    try {
        //This project is App Router => this block will not implement
        const res = await fetch("https://serverapi-pi.vercel.app/api/user/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }

        const result = await res.json();
        console.log(result)
        return result;

    } catch (error) {
        console.error("[callAddUser] Error:", error);
        throw error;

    }





}