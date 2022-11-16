// When we get a get request- we pass in the current time as a parameter. 
// With range of dates-  date1=takeIntoAccountDaylightSavings(date1)
// date2=takeIntoAccountDaylightSavings(date1)
// filter on these dates

function takeIntoAccountDaylightSavings(localTimeString){

    // convert to msec since Jan 1 1970
    //const d = new Date()
  
    const d=stringToTime(localTimeString);
    const localTime = d.getTime()
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


    const stringToDate = (localTimeString) => {
        // input format is- 17-JUL-2020 01
        // convert string to date 
        // Date Syntax: new Date(year value, IndexOfMonth, day value, hours, minutes, seconds)
        const [dateValues, timeValues] = localTimeString.split(' ');
        const [day, month, year] = dateValues.split('-');
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        monthNum = months.indexOf(month.toLowerCase());
        const date = new Date(year,monthNum,day, timeValues);
  
        return date;
    }
    return nd;
}

