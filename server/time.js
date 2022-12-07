// When we get a get request- we pass in the current time as a parameter. 
// With range of dates-  date1=takeIntoAccountDaylightSavings(date1)
// date2=takeIntoAccountDaylightSavings(date1)
// filter on these dates

function takeIntoAccountDaylightSavings(localTimeString){
    
    const getstringToDate = (localTimeString) => {
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
    // convert to msec since Jan 1 1970
    //const d = new Date()
  
    const d=getstringToDate(localTimeString);
    //const d=new Date(2022,11,06, 1);
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

    


    
    console.log(nd.getTime())
    return nd;
}

// takeIntoAccountDaylightSavings('17-JUL-2020 01')
let d1 = takeIntoAccountDaylightSavings('06-Nov-2022 00')
let date3 = takeIntoAccountDaylightSavings('06-Nov-2022 01')
let date4 = takeIntoAccountDaylightSavings('06-Nov-2022 02')
let date5 = takeIntoAccountDaylightSavings('06-Nov-2022 03')
let d2 = takeIntoAccountDaylightSavings('06-Nov-2022 04')
console.log("Diff1: %d", date5.getTime() - date4.getTime())
console.log("Diff2: %d", date4.getTime() - date3.getTime())
console.log(d1)
console.log(date3)
console.log(date4)
console.log(date5)
console.log(d2)

let date7 = takeIntoAccountDaylightSavings('13-Mar-2022 00')
// These next 3 dates display the same time, but why?
let date0 = takeIntoAccountDaylightSavings('13-Mar-2022 01') 
let date1 = takeIntoAccountDaylightSavings('13-Mar-2022 02')
let date2 = takeIntoAccountDaylightSavings('13-Mar-2022 03')
console.log(date0)
console.log(date1)
console.log(date2)

// These next 3 dates display the same time, but why?
let date9 = takeIntoAccountDaylightSavings('14-Mar-2021 01') 
let date10 = takeIntoAccountDaylightSavings('14-Mar-2021 02')
let date11 = takeIntoAccountDaylightSavings('14-Mar-2021 03')
console.log(date9)
console.log(date10)
console.log(date11)

// date6 = takeIntoAccountDaylightSavings('13-Mar-2022 04')
// date8 = takeIntoAccountDaylightSavings('13-Mar-2022 05')
// console.log("Diff3: %d", date0.getTime() - date7.getTime())
// console.log("Diff4: %d", date6.getTime() - date2.getTime())
// console.log("Diff5: %d", date8.getTime() - date6.getTime())

// date1 = takeIntoAccountDaylightSavings('06-Nov-2022 04')
// date2 = takeIntoAccountDaylightSavings('06-Nov-2022 05')
// console.log("Diff: %d", date2.getTime() - date1.getTime())
// takeIntoAccountDaylightSavings('06-Nov-2022 06')