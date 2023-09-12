let weeklyCalendarNav = 0;
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const weeklyCalendarEl = document.getElementById("weekly-calendar")
const monthYear = document.getElementById("month-year")
const monthYearDay = document.getElementById("month-day-year")

function renderWeeklyCalendar(){
  const dateObj = new Date()
  
  const currentDate = dateObj.getDate()
  const currentWeekDayName = dateObj.getDay()
  const currentYear = dateObj.getFullYear()
  const currentMonth = dateObj.getMonth()
  console.log(currentMonth+1)
  //gets first day in month
  const firstDayInMonth = new Date(currentYear,currentMonth,1)
  
  //Gets last day in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
 
  //Gets last day in previous month
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()
  console.log(daysInPrevMonth)
  //gets monday date of current week
  const mondayDate = currentDate - currentWeekDayName + 1
  
  //Gets current weekday name
  const getWeekDayName = (year,month,days) =>{
    let day = new Date(Date.UTC(year,month,days))
    const weekDay = {weekday: 'short'}
    return new Intl.DateTimeFormat('cet', weekDay).format(day)
  }
  
  for(let i = 0; i < 7; i++){
    if(mondayDate + i > daysInMonth){
      let j = 1;
      const weeklyDayEl = document.createElement('div')
      weeklyDayEl.addEventListener("click",() =>{
      console.log("clicked", mondayDate + i )
    })
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = 
    `<p>${getWeekDayName(currentYear,currentMonth + 1,j)}</p>
    <p class="weekly-calendar-day">${j}</p>`
    j++;
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
    }else{
      const weeklyDayEl = document.createElement('div')
      weeklyDayEl.addEventListener("click",() =>{
      console.log("clicked", mondayDate + i )
    })
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = 
    `<p>${getWeekDayName(currentYear,currentMonth,mondayDate + i)}</p>
    <p class="weekly-calendar-day">${mondayDate + i}</p>`
    
    if(mondayDate + i === currentDate){
      const currentWeekDay = weeklyDayEl.querySelector('.weekly-calendar-day')
      currentWeekDay.classList.add('current-day')
    }
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
    }
  }

  // for(let i = date; i <= daysInMonth; i++){
  //   const weeklyDayEl = document.createElement('div')
  //   weeklyDayEl.addEventListener("click",() =>{
  //     console.log(i)
  //   })
  //   weeklyDayEl.className = "day-container"
  //   weeklyDayEl.innerHTML = `<p>${getWeekDayName(i)}</p><p class="weekly-calendar-day">${i}</p>`
  //   if(i === date){
  //     const currentWeekDay = weeklyDayEl.querySelector('.weekly-calendar-day')
  //     currentWeekDay.classList.add('current-day')
  //   }
  //   document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
  // }
  monthYearDay.innerHTML = `${dateObj.toLocaleDateString('cet',{
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  })}`
  monthYear.innerHTML = `${months[currentMonth]} ${currentYear}`
  
}


renderWeeklyCalendar()
