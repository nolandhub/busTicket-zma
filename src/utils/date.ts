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
