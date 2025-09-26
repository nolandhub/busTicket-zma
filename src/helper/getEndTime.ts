/**
 * Get end time by startTime and durationTime
 */
export const getTime = (startTime: string, duration: number): number => {

    const [hours, mins] = startTime.split(':').map(Number)
    const today = new Date()   //2025-09-26T10:00:00
    const startDateTime = today.setHours(hours, mins, 0, 0)
    const endDateTime = new Date(startDateTime)

    // Return number start 1/1/1970 utc . offset to hour if minutes over (0-59)
    return endDateTime.setMinutes(endDateTime.getMinutes() + duration)

}