export function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h${mins}m`;
}


export function formatEndTime(endTime: number) {
    const parseDate = new Date(endTime)
    const time = parseDate.toLocaleTimeString('vi-VN',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }
    )

    return time
}