//removes selected day from each element on click
export function removeSelectedDay(){
    document.querySelectorAll('.date-circle').forEach(element => {
    element.classList.remove('selected-day');
    });
  }
  
  //Gets weekday name
  export const getWeekDayName = (year,month,days) =>{
    let day = new Date(Date.UTC(year,month,days))
    const options = {weekday: 'short'}
    return new Intl.DateTimeFormat('en-Us', options).format(day)
  }
  
  //Gets date
  export const getDateNumber = (year,month,days) =>{
    let date = new Date(Date.UTC(year,month,days))
    const options = {day: 'numeric'}
    return new Intl.DateTimeFormat('en-Us', options).format(date)
  }
  
  //Gets Month year
  export const getMonthYear = (year,month,days) =>{
    let date = new Date(Date.UTC(year,month,days))
    const options = {month: 'long', year: '2-digit'}
    return new Intl.DateTimeFormat('en-Us', options).format(date)
  }
  
  //Gets YYYYMMDD format
 export function formatDateToYYYYMMDD(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateFormatter = new Intl.DateTimeFormat('en-CA', options);
    return dateFormatter.format(date);
  }

  //export default {getDateNumber,getMonthYear,getWeekDayName,formatDateToYYYYMMDD,removeSelectedDay}