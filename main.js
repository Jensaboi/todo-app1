let weeklyCalendarNav = 0;
let selectedDay = new Date();

const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasksOnDate"))
let tasksOnDate = (tasksFromLocalStorage) ? tasksFromLocalStorage : {};

//add task modal
const modalsOverlayBg = document.getElementById("modals-overlay-bg")
const taskInput = document.getElementById("task-input")
const dateInput = document.getElementById("date-input")
const descriptionInput = document.getElementById("description-textarea")
const priorityInput = document.getElementById("priority-input")
const timeFromInput = document.getElementById("time-from-input")
const timeEndInput = document.getElementById("time-end-input")

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
  const displayMonth = document.getElementById("display-month")

  displayMonth.innerHTML = `${getMonthYear(currentYear, currentMonth, currentDate)}`
  
  //gets monday date of current week
  if(currentWeekDayName === 0){
    currentWeekDayName = 7
  }

  const weeklyCalendar = document.getElementById("weekly-calendar")
  weeklyCalendar.innerHTML = ''
  const mondayDate = currentDate - currentWeekDayName + 1 // +1 för måndag

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
    
      removeSelectedDay()
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

//removes selected day from each element on click
function removeSelectedDay(){
  document.querySelectorAll('.date-circle').forEach(element => {
  element.classList.remove('selected-day');
  });
}

//Gets weekday name
const getWeekDayName = (year,month,days) =>{
  let day = new Date(Date.UTC(year,month,days))
  const options = {weekday: 'short'}
  return new Intl.DateTimeFormat('en-Us', options).format(day)
}

//Gets date
const getDateNumber = (year,month,days) =>{
  let date = new Date(Date.UTC(year,month,days))
  const options = {day: 'numeric'}
  return new Intl.DateTimeFormat('en-Us', options).format(date)
}

//Gets Month year
const getMonthYear = (year,month,days) =>{
  let date = new Date(Date.UTC(year,month,days))
  const options = {month: 'long', year: '2-digit'}
  return new Intl.DateTimeFormat('en-Us', options).format(date)
}

//Gets YYYYMMDD format
function formatDateToYYYYMMDD(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateFormatter = new Intl.DateTimeFormat('en-CA', options);
  return dateFormatter.format(date);
}

function openAddModal(){
  modalsOverlayBg.style.display = "block"
  dateInput.value = formatDateToYYYYMMDD(selectedDay)

}

function closeAddEventModal(){
  taskInput.value = ''
  dateInput.value = ''
  descriptionInput.value = ''
  modalsOverlayBg.style.display = "none"
}

function renderSelectedDay(){
  const taskList = document.getElementById('task-list')
  const displaySelectedDay = document.getElementById("display-selected-day")

  displaySelectedDay.innerHTML = `${formatDateToYYYYMMDD(selectedDay)}`
  taskList.innerHTML = ''
  
  if(formatDateToYYYYMMDD(selectedDay) in tasksOnDate){
    const tasksForSelectedDate = tasksOnDate[formatDateToYYYYMMDD(selectedDay)]

    for(const taskObj of tasksForSelectedDate){
      const taskListItem = document.createElement('li')
      taskListItem.className = 'task-li'
      taskListItem.innerHTML = 
      `
      <div class="card-top-section">
        <p class="task-priority ${taskObj.priority}">${taskObj.priority}</p>   
        <div class="time-container">
          <p>${taskObj.timeFrom}</p>
          <p>${taskObj.timeTo}</p>
        </div>
      </div>
      <h3 class="task-name">${taskObj.task}</h3>
      `

      //Check if there's a description and add it to the list item
      if (taskObj.description) {
        const descriptionP = document.createElement('p');
        descriptionP.className = 'description-p'
        descriptionP.textContent = `${taskObj.description}`;
          
        taskListItem.appendChild(descriptionP);
      }
      
      const deleteBtn = document.createElement('button')
      deleteBtn.className = "delete-btn"
      deleteBtn.innerHTML = `&#x2715;`
      deleteBtn.addEventListener('click', () =>{
        
        // Removes the task from tasksForSelectedDate
        const taskIndex = tasksForSelectedDate.findIndex(item => item.task === taskObj.task);
        if (taskIndex !== -1) {
          tasksForSelectedDate.splice(taskIndex, 1);
          localStorage.setItem("tasksOnDate", JSON.stringify(tasksOnDate))
          
          renderSelectedDay();  // Re-render selected day
          renderWeeklyCalendar() // Re-render weekly calendar
        }

      })
      taskListItem.appendChild(deleteBtn) 
      document.querySelector('#task-list').appendChild(taskListItem)
    }
  }
 }

 class Task {
  constructor(task, priority, description, taskColor, timeFrom, timeTo, completed){
    this.task = task;
    this.priority = priority;
    this.description = description;
    this.taskColor = taskColor;
    this.timeFrom = timeFrom;
    this.timeTo = timeTo;
    this.completed = completed;
  }
}

 function addTaskToDate(date,task){
  if(!tasksOnDate[date]){
    tasksOnDate[date] = []
  }
  tasksOnDate[date].push(task)
  localStorage.setItem("tasksOnDate", JSON.stringify(tasksOnDate))
}

function saveTaskBtn(){
  let task = new Task(taskInput.value, priorityInput.value, descriptionInput.value, "red", timeFromInput.value, timeEndInput.value, false)
  
  if(dateInput.value && taskInput.value){
    addTaskToDate(dateInput.value, task)
  } else { 
    console.log("nothing happens")
  }
  
  renderSelectedDay()
  renderWeeklyCalendar()
  closeAddEventModal()
}

function initializingButtons () {

  document.getElementById("weekly-back-btn").addEventListener('click',() => {
    weeklyCalendarNav -= 7;
    renderWeeklyCalendar()
  })

  document.getElementById("weekly-next-btn").addEventListener('click',() => {
    weeklyCalendarNav += 7;
    renderWeeklyCalendar()
  })

  document.getElementById("open-event-modal-btn").addEventListener('click', openAddModal)

  document.getElementById("close-event-modal-btn").addEventListener('click', closeAddEventModal)

  document.getElementById("save-event-btn").addEventListener('click', saveTaskBtn)
}


renderWeeklyCalendar()
initializingButtons()
renderSelectedDay()