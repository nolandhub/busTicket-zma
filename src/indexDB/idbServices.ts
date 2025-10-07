
import { dbPromise } from "@/indexDB/index";

export const idbService = {
    async getAllByIndex(store: string, key: string, querryKey: string) {
        const db = await dbPromise;
        return db.getAllFromIndex(store, key, querryKey)
    },

    async getById(store: string, id: string) {
        const db = await dbPromise;
        return db.get(store, id);
    },

    async add(store: string, data: any) {
        const db = await dbPromise;
        return db.add(store, data);
    },

    async upSert(store: string, id: string, updates: any) {
        const db = await dbPromise;
        const current = await db.get(store, id);
        const updated = current ? { ...current, ...updates } : { id, ...updates }
        return db.put(store, updated);
    },

    async delete(store: string, id: string) {
        const db = await dbPromise;
        return db.delete(store, id);
    },
};
