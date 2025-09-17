// utils/format.ts
export const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return "";

    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");

    return `${day}-${month}-${year}`;
};

