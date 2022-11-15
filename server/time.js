// When we get a get request- we pass in the current time as a parameter. 
// With range of dates-  date1=takeIntoAccountDaylightSavings(date1)
// date2=takeIntoAccountDaylightSavings(date1)
// filter on these dates

function takeIntoAccountDaylightSavings(localTime){
    const d = new Date()

    // convert to msec since Jan 1 1970
    //const localTime = d.getTime()

    // obtain local UTC offset and convert to msec
    const localOffset = d.getTimezoneOffset() * 60 * 1000

    // obtain UTC time in msec
    const utcTime = localTime + localOffset

    // obtain and add destination's UTC time offset
    const estOffset = getEstOffset()
    const usa = utcTime + (60 * 60 * 1000 * estOffset)

    // convert msec value to date string
    const nd = new Date(usa)

    // Get time zone offset for NY, USA
    const getEstOffset = () => {
        const stdTimezoneOffset = () => {
            var jan = new Date(0, 1)
            var jul = new Date(6, 1)
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
        }

        var today = new Date()
        
        const isDstObserved = (today) => {
            return today.getTimezoneOffset() < stdTimezoneOffset()
        }

        if (isDstObserved(today)) {
            return -4
        } else {
            return -5
        }
    }
    return nd;
}
