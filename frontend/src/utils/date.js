// a and b are javascript Date objects
export function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function stringToLocalHourMinsString(stringDate) {
    return new Date(stringDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function stringToLocalDateString(stringDate) {
    return new Date(stringDate).toLocaleDateString('en-US')
}

export function toDateFormat(date) {
    let options = { month: "short", day: "numeric" }
    if (date.getFullYear() !== (new Date().getFullYear())) { options['year'] = "numeric" }
    return date.toLocaleDateString('en-us', options)
}

//export function isSameDay(date1, date2) { return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() }

export function isToday(date1, date2) {
    return dateDiffInDays(date1, date2) === 0
}

export function isYesterday(date1, date2) {
    return dateDiffInDays(date1, date2) === 1
}