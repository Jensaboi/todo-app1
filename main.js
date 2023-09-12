let weeklyCalendarNav = 0;
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const weeklyCalendar = document.getElementById("weekly-calendar")
const weeklyBackBtnEle = document.getElementById("weekly-back-btn")
const weeklyNextBtnEle = document.getElementById("weekly-next-btn")

const monthYear = document.getElementById("month-year")
const monthYearDay = document.getElementById("month-day-year")
const displayMonth = document.getElementById("display-month")

function renderWeeklyCalendar(){
  const dateObj = new Date()
  
  if(weeklyCalendarNav !== 0){
    dateObj.setDate(new Date().getDate() + weeklyCalendarNav)
  }

  const currentDate = dateObj.getDate()
  const currentWeekDayName = dateObj.getDay()
  const currentYear = dateObj.getFullYear()
  const currentMonth = dateObj.getMonth()
 
  //gets monday date of current week
  //              date  day  +1 för måndag
  const mondayDate = currentDate - currentWeekDayName + 1

  weeklyCalendar.innerHTML = ''
  for(let i = 0; i < 7; i++){
    const weeklyDayEl = document.createElement('div')
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = 
    `<p>${getWeekDayName(currentYear,currentMonth,mondayDate + i)}</p>
    <p class="weekly-calendar-day">${getDateNumber(currentYear,currentMonth,mondayDate + i)}</p>`
    
    weeklyDayEl.addEventListener("click",() =>{
      console.log("clicked", getDateNumber(currentYear,currentMonth,mondayDate + i))
    })

    if(mondayDate + i === new Date().getDate()){
      const currentWeekDay = weeklyDayEl.querySelector('.weekly-calendar-day')
      currentWeekDay.classList.add('current-day')
    }
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
    
  }

  monthYearDay.innerHTML = `${dateObj.toLocaleDateString('en-Us',{
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  })}`

  displayMonth.innerHTML = `${months[currentMonth]}`
  monthYear.innerHTML = `${months[currentMonth]} ${currentYear}`
}

 //Gets weekday name
 const getWeekDayName = (year,month,days) =>{
  let day = new Date(Date.UTC(year,month,days))
  const weekDay = {weekday: 'short'}
  return new Intl.DateTimeFormat('en-Us', weekDay).format(day)
}
//Gets date
const getDateNumber = (year,month,days) =>{
  let date = new Date(Date.UTC(year,month,days))
  const weekDate = {day: 'numeric'}
  return new Intl.DateTimeFormat('en-Us', weekDate).format(date)
}


function weeklyCalendarButtons(){
  const dateObj = new Date()
  weeklyBackBtnEle.addEventListener('click',() =>{
    weeklyCalendarNav -= 7;
    renderWeeklyCalendar()
  })

  weeklyNextBtnEle.addEventListener('click',() =>{
    weeklyCalendarNav += 7;
    renderWeeklyCalendar()
  })
}

weeklyCalendarButtons()
renderWeeklyCalendar()
