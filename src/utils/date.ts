import dayjs from "dayjs";
import "dayjs/locale/vi";

// Set global locale là tiếng Việt
dayjs.locale("vi");

/**
 * Format hiển thị cho người dùng
 * VD: "Thứ Năm, 18/09/2025"
 */
export const formatDateVN = (date: Date | string) => {
    return dayjs(date).format("dddd, DD/MM/YYYY");
};

/**
 * Format lưu xuống Firestore hoặc đưa lên URL
 * VD: "2025-09-18"
 */
export const parseString = (date: Date) => {
    return dayjs(date).format("DD/MM/YYYY");
};

/**
 * Parse date từ Firestore hoặc URL (string)
 */
export const parseDate = (dateStr: string) => {
    return dayjs(dateStr, "YYYY/MM/DD").toDate();
};

/**
 * Kiểm tra vé đã hết hạn chưa
 */


export const isExpired = (date: Date | string) => {
    return dayjs(date).isBefore(dayjs(), "day");
};

/**
 * Lấy ngày hôm nay (reset giờ về 00:00)
 */
export const today = () => {
    return dayjs().startOf("day").toDate();
};

/**
 * Trả về khoảng cách giữa 2 ngày tính cả ngày bắt đầu
 */
export function getRangeDays(start: Date, end: Date, inclusive = true) {
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    let diff = Math.round(
        (endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)
    );

    return inclusive ? diff + 1 : diff;
}

