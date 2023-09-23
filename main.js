let weeklyCalendarNav = 0;
let selectedDay = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasksOnDate"))
let tasksOnDate = (tasksFromLocalStorage) ? tasksFromLocalStorage : {};
console.log(tasksOnDate)

//weekly calendar
const weeklyCalendar = document.getElementById("weekly-calendar")
const weeklyBackBtnEle = document.getElementById("weekly-back-btn")
const weeklyNextBtnEle = document.getElementById("weekly-next-btn")

//Modals
const modalsOverlayBg = document.getElementById("modals-overlay-bg")
const saveEventBtn = document.getElementById("save-event-btn")
const closeAddEventModalBtn = document.getElementById("close-event-modal-btn")
const taskInput = document.getElementById("task-input")
const dateInput = document.getElementById("date-input")
const descriptionInput = document.getElementById("description-textarea")
const priorityInput = document.getElementById("select-input")
const timeFromInput = document.getElementById("time-from-input")
const timeEndInput = document.getElementById("time-end-input")

//displays
const displayCurrentMonthYear = document.getElementById("display-current-mont-year")
const displayMonth = document.getElementById("display-month")

//Display selected day
const displaySelectedDay = document.getElementById("display-selected-day")
const dailyTasks = document.getElementById("daily-tasks-container")
const eventList = document.getElementById('event-list')



function renderWeeklyCalendar(){
  const dateObj = new Date()
  
  //Sets date with nav if its not 0
  if(weeklyCalendarNav !== 0){
    dateObj.setDate(new Date().getDate() + weeklyCalendarNav)
  }

  const currentDate = dateObj.getDate()
  let currentWeekDayName = dateObj.getDay()
  const currentYear = dateObj.getFullYear()
  const currentMonth = dateObj.getMonth()
 
  displayMonth.innerHTML = `${months[currentMonth]} ${currentYear % 100}`
  
  //gets monday date of current week
  if(currentWeekDayName === 0){
    currentWeekDayName = 7
  }
  const mondayDate = currentDate - currentWeekDayName + 1 // +1 för måndag

  weeklyCalendar.innerHTML = ''

  for(let i = 0; i < 7; i++){
    const weeklyDayEl = document.createElement('div')
    weeklyDayEl.className = "day-container"
    weeklyDayEl.innerHTML = 
    `<p class="week-day-name">
      ${getWeekDayName(currentYear,currentMonth,mondayDate + i)}
    </p>
    <div class="date-circle">
      <p class="weekly-calendar-day">
        ${getDateNumber(currentYear,currentMonth,mondayDate + i)}
      </p>
    </div>
    `
    weeklyDayEl.addEventListener("click", () => {    
      
      selectedDay = new Date(currentYear, currentMonth, mondayDate + i)
      renderSelectedDay(selectedDay)
      
      //removes selected day from each element on click
      document.querySelectorAll('.date-circle').forEach(element => {
        element.classList.remove('selected-day');
      });
      
      //adds selected day class on click
      weeklyDayEl.querySelector('.date-circle').classList.add('selected-day') 
    })

     // readds selected day if user change week and then goes back
    if (formatDateToYYYYMMDD(selectedDay) === formatDateToYYYYMMDD(new Date(currentYear, currentMonth, mondayDate + i))) {
      weeklyDayEl.querySelector('.date-circle').classList.add('selected-day');
    }

    //adds current day class if nav is 0 and its current date
    if(mondayDate + i === currentDate && weeklyCalendarNav === 0){
      weeklyDayEl.querySelector('.date-circle').classList.add('current-day')
      if(selectedDay === null){
        selectedDay = new Date(currentYear, currentMonth, currentDate)
        weeklyDayEl.querySelector('.date-circle').classList.add('selected-day')
      }
    }
    
    //checks if date exists in tasksOnDate obj
    if(formatDateToYYYYMMDD(new Date(currentYear, currentMonth, mondayDate + i)) in tasksOnDate){

      const tasksContainer = document.createElement('div');
      tasksContainer.className = "tasks-on-weekly-calendar-container";
      //loops out task circles on that day 
      for(const taskObj of tasksOnDate[formatDateToYYYYMMDD(new Date(currentYear, currentMonth, mondayDate + i))]){
        
        const taskCircle = document.createElement('div');
        taskCircle.className = `task-circle ${taskObj.priority}`;
        tasksContainer.appendChild(taskCircle)       
      }
      weeklyDayEl.appendChild(tasksContainer);
    }
    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
  }
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

//Gets YYYYMMDD format
function formatDateToYYYYMMDD(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateFormatter = new Intl.DateTimeFormat('en-CA', options);
  return dateFormatter.format(date);
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

  document.getElementById("open-event-modal-btn").addEventListener('click', openAddEventModal)

  closeAddEventModalBtn.addEventListener('click', closeAddEventModal)

  saveEventBtn.addEventListener('click', saveEventToLocalStorage)
}

function openAddEventModal(){
  modalsOverlayBg.style.display = "block"
  dateInput.value = formatDateToYYYYMMDD(selectedDay)
  
}

function closeAddEventModal(){
  taskInput.value = ''
  dateInput.value = ''
  modalsOverlayBg.style.display = "none"
  descriptionInput.value = ''
}

 class Task {
  constructor(task, priority, description, taskColor, timeFrom, timeTo){
    this.task = task;
    this.priority = priority;
    this.description = description;
    this.taskColor = taskColor;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
  }
}

function addTaskToDate(date,task){
  if(!tasksOnDate[date]){
    tasksOnDate[date] = []
  }
  tasksOnDate[date].push(task)
}

function renderSelectedDay() {
  const selectedDayString = formatDateToYYYYMMDD(selectedDay)

  displaySelectedDay.innerHTML = `${selectedDayString}`
  eventList.innerHTML = ''
  
  if(selectedDayString in tasksOnDate){
    const tasksForSelectedDate = tasksOnDate[selectedDayString]

    for(const taskObj of tasksForSelectedDate){
      const eventListItem = document.createElement('li')
      eventListItem.className = 'event-li'
      eventListItem.innerHTML = 
      `
      <div class="task-prio-time-container">
        <p class="task-priority ${taskObj.priority}">${taskObj.priority}</p>
        <div class="task-time-container">
          <p>${taskObj.timeFrom}</p>
          <p>${taskObj.timeTo}</p>
        </div>
      </div>
      <p class="task-p">${taskObj.task}</p>
      `
  
      //Check if there's a note and add it to the list item
      if (taskObj.description) {
        const descriptionP = document.createElement('p');
        descriptionP.className = 'note-p'
        descriptionP.textContent = ` - ${taskObj.description}`;
          
        eventListItem.appendChild(descriptionP);
      }
    document.querySelector('#event-list').appendChild(eventListItem)
    }
  }
 }

function saveEventToLocalStorage(){
  
  if(dateInput.value == '' || taskInput.value == ''){
    console.log("nothing happens")
  } else { 
    let selectedDayString = formatDateToYYYYMMDD(selectedDay)
    let task = new Task(taskInput.value, priorityInput.value, descriptionInput.value, "red", timeFromInput.value, timeEndInput.value)
    addTaskToDate(selectedDayString,task)
  }

  localStorage.setItem("tasksOnDate", JSON.stringify(tasksOnDate))
  
  renderSelectedDay()
  renderWeeklyCalendar()
  closeAddEventModal()
}


renderWeeklyCalendar()
initializingButtons()
renderSelectedDay()