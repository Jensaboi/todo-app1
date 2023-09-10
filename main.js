const days = ["Sön","mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const date = new Date()
const currYear = date.getFullYear()
const currMonth = date.getMonth()
const currDate = date.getDate()
const day = date.getDay()

//console.log(day)

const weeklyCalendarEl = document.getElementById("weekly-calendar")
const monthYear = document.getElementById("month-year")

//Loopar ut dagarna innan current day
for(let i = 0; i < day; i++){
  
  const weeklyDayEl = document.createElement('div')
  let weekDay = currDate - day + i
  weeklyDayEl.className = "day-container"
  console.log(weekDay)
  //console.log(i)
  weeklyDayEl.innerHTML = `<p class="day-name">${days[i]}</p> <p class="weekly-calendar-day">${weekDay}</p>`
  document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
}
//loopar ut current day + dagarna efter
for(let i = day; i < days.length; i++){
    console.log(i)
    const weeklyDayEl = document.createElement('div')
    let weekDay = currDate + i
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = `<p class="day-name">${days[i]}</p> <p class="weekly-calendar-day">${weekDay}</p>`

    //setting current day
    if(weekDay == currDate){
      const currentWeekDay = weeklyDayEl.querySelector('.weekly-calendar-day')
      currentWeekDay.classList.add('current-day')
     }
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
  }

monthYear.innerHTML = `${months[currMonth]} ${currYear}`
  
