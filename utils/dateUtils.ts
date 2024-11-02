
export const convertTwoDateStringToStringDisplay = (stringDate1,stringDate2) => {
    const date1 = new Date(stringDate1)
    const date2 = new Date(stringDate2)
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var display_date = ""
    if(date1.getYear() != date2.getYear()){
        const formattedDateCheckout = date2.toLocaleDateString("en-GB",{
            day: "numeric",
            month: "short",
            year: "numeric"
        })
        const formattedDateCheckin = date1.toLocaleDateString("en-GB",{
            day: "numeric",
            month: "short",
            year: "numeric"
        })
        display_date = formattedDateCheckin + " - "+ formattedDateCheckout
    } 
    else if(date1.getMonth() == date2.getMonth() && date1.getYear() == date2.getYear()){
        display_date = date1.getDate() + " - "+date2.getDate()+" "+monthNames[date1.getMonth()]+" "+date1.getFullYear()
    }
    else{
        display_date = `${date1.getDate()} ${monthNames[date1.getMonth()]} - ${date2.getDate()} ${monthNames[date2.getMonth()]} ${date1.getFullYear()}`
    }

    return display_date
}