/**
 * Format chuỗi thời gian ISO hoặc đối tượng Date thành "HH:mm" giờ Việt Nam (UTC+7)
 * @param input Thời gian dạng ISO string hoặc Date object
 * @returns Chuỗi định dạng "HH:mm" theo giờ Việt Nam
 */
export function formatTime(input: string): string {
    const date = new Date(input);

    // Cộng thêm 7 tiếng để chuyển từ UTC sang giờ Việt Nam
    const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    const hours = vietnamTime.getUTCHours(); // getUTCHours vì đã cộng thủ công offset
    const minutes = vietnamTime.getUTCMinutes();

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
}
