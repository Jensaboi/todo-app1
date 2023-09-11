let weeklyCalendarNav = 0;

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const weeklyCalendarEl = document.getElementById("weekly-calendar")
const monthYear = document.getElementById("month-year")
const monthYearDay = document.getElementById("month-day-year")

function renderWeeklyCalendar(){
  const dateObj = new Date()
  
  const date = dateObj.getDate()
  const day = dateObj.getDay()
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()

  //gets first day in month
  const firstDayInMonth = new Date(year,month,1)
  //console.log(firstDayInMonth)
  
  //Gets last day in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  //Gets current weekday name
  const getWeekDayName = (days) =>{
    let day = new Date(Date.UTC(year,month, days))
    const weekDay = {weekday: 'short'}
    return new Intl.DateTimeFormat('cet', weekDay).format(day)
  }
  for(let i = 1; i < date; i++){
    const weeklyDayEl = document.createElement('div')
    weeklyDayEl.addEventListener("click",() =>{
      console.log("clicked", i )
    })
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = `<a href="#${i}"></a><p>${getWeekDayName(i)}</p><p class="weekly-calendar-day">${i}</p>`
    
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
  }

  for(let i = date; i <= daysInMonth; i++){
    const weeklyDayEl = document.createElement('div')
    weeklyDayEl.addEventListener("click",() =>{
      console.log(i)
    })
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = `<p>${getWeekDayName(i)}</p><p class="weekly-calendar-day">${i}</p>`
    if(i === date){
      const currentWeekDay = weeklyDayEl.querySelector('.weekly-calendar-day')
      currentWeekDay.classList.add('current-day')
    }
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
  }
  monthYearDay.innerHTML = `${dateObj.toLocaleDateString('cet',{
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  })}`
  monthYear.innerHTML = `${months[month]} ${year}`
  console.log(date)
}


//renderWeeklyCalendar()
function nyFunc(){
  const dateObj = new Date()
  
  const date = dateObj.getDate()
  const day = dateObj.getDay()
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()

  const getWeekDayName = (days) =>{
    let day = new Date(Date.UTC(year,month, days))
    const weekDay = {weekday: 'short'}
    return new Intl.DateTimeFormat('cet', weekDay).format(day)
  }
//loopar ut dagarna innan current day
 for(let i = 0; i < day; i++){
  
  const weeklydayel = document.createelement('div')
   weeklydayel.classname = "day-container"
   weeklydayel.innerhtml = 
   `<p class="day-name">${days[i]}</p>
    <p class="weekly-calendar-day">${getWeekDayName(i)}</p>`
 
 document.queryselector('#weekly-calendar').appendchild(weeklydayel);
 }
 //loopar ut current day + dagarna efter
for(let i = day ; i < days.length; i++){
   const weeklydayel = document.createelement('div')
  let weekday = currdate + i -1
   weeklydayel.classname = "day-container"
   weeklydayel.innerhtml = `<p class="day-name">${days[i]}</p> <p class="weekly-calendar-day">${getWeekDayName(i)}</p>`
   //setting current day
  if(weekday == currdate){
      const currentweekday = weeklydayel.queryselector('.weekly-calendar-day')
      currentweekday.classlist.add('current-day')
    }
    document.queryselector('#weekly-calendar').appendchild(weeklydayel);
 }
}
nyFunc()