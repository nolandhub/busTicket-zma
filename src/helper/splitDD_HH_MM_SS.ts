
export const splitDD_HH_MM_SS = (seconds: number) => {
    const days = Math.floor(seconds / 86400) // 1 ngày = 86400s
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

    // Nếu có ngày, hiển thị thêm phần ngày
    return days > 0 ? `${days} ngày ${timeStr}` : timeStr
}
