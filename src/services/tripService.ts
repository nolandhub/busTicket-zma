import { TripWithSale } from "@/types/tripType";
import axios from "axios";

export async function fetchAvailableTrips(routeCode: string, date: string): Promise<TripWithSale[]> {
    try {
        const snapShot = await axios.get("https://216tvbfb-3000.asse.devtunnels.ms/api/trips/search", {
            params: {
                routeCode: routeCode,
                departDate: date
            }
        })
        return snapShot.data

    } catch (error) {
        console.error('Lỗi khi fetch API:', error);
        throw error
    }
}