let weeklyCalendarNav = 0;
let selectedDay = null;
let todoList = []
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

//weekly calendar
const weeklyCalendar = document.getElementById("weekly-calendar")
const weeklyBackBtnEle = document.getElementById("weekly-back-btn")
const weeklyNextBtnEle = document.getElementById("weekly-next-btn")

//add event modal
const saveEventBtn = document.getElementById("save-event-btn")
const closeAddEventModalBtn = document.getElementById("close-event-modal-btn")
const openAddEventModalBtn = document.getElementById("open-event-modal-btn")

const monthYear = document.getElementById("month-year")
const monthYearDay = document.getElementById("month-day-year")
const displayMonth = document.getElementById("display-month")

const dailyTasks = document.getElementById("daily-tasks-container")

const getYear = new Date().getFullYear()
const getMonth = new Date().getMonth()

monthYear.textContent = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`
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
  const mondayDate = currentDate - currentWeekDayName + 1 // +1 för måndag

 
  weeklyCalendar.innerHTML = ''
  for(let i = 0; i < 7; i++){
    const weeklyDayEl = document.createElement('div')
    weeklyDayEl.className = "day-container"
    weeklyDayEl.dataset.date = new Date(currentYear, currentMonth, mondayDate + i);
    weeklyDayEl.innerHTML = 
    `<p>
      ${getWeekDayName(currentYear,currentMonth,mondayDate + i)}
    </p>

    <p class="weekly-calendar-day">
      ${getDateNumber(currentYear,currentMonth,mondayDate + i)}
    </p>`
    
    weeklyDayEl.addEventListener("click",() =>{    
      renderSelectedDay(new Date(currentYear, currentMonth, mondayDate + i))

      document.querySelectorAll('.weekly-calendar-day').forEach(element => {
        element.classList.remove('selected-day');
    });
    
    weeklyDayEl.querySelector('.weekly-calendar-day').classList.add('selected-day')  
    })

    if(mondayDate + i === new Date().getDate()){
      weeklyDayEl.querySelector('.weekly-calendar-day').classList.add('current-day')  
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


function initializingButtons () {

  weeklyBackBtnEle.addEventListener('click',() => {
    weeklyCalendarNav -= 7;
    renderWeeklyCalendar()
  })

  weeklyNextBtnEle.addEventListener('click',() => {
    weeklyCalendarNav += 7;
    renderWeeklyCalendar()
  })

  openAddEventModalBtn.addEventListener('click', () => {
    document.getElementById("add-event-modal").style.display = "block"
  })

  closeAddEventModalBtn.addEventListener('click', closeAddEventModal)
  
}

function closeAddEventModal(){
  document.getElementById("add-event-modal").style.display = "none"
}


function setSelectedDay() {

}

function renderSelectedDay(date) {
  selectedDay = date
  console.log(selectedDay)
}


initializingButtons()
renderWeeklyCalendar()
