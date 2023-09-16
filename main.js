let weeklyCalendarNav = 0;
let selectedDay = null;
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const eventsFromLocalStorage = JSON.parse(localStorage.getItem("events"))
let events = (eventsFromLocalStorage) ? eventsFromLocalStorage : [];
console.log(events)
//weekly calendar
const weeklyCalendar = document.getElementById("weekly-calendar")
const weeklyBackBtnEle = document.getElementById("weekly-back-btn")
const weeklyNextBtnEle = document.getElementById("weekly-next-btn")

//Modals
const modalsOverlayBg = document.getElementById("modals-overlay-bg")
const saveEventBtn = document.getElementById("save-event-btn")
const closeAddEventModalBtn = document.getElementById("close-event-modal-btn")
const openAddEventModalBtn = document.getElementById("open-event-modal-btn")
const eventInput = document.getElementById("event-input")
const dateInput = document.getElementById("date-input")
const noteTextArea = document.getElementById("note-textarea")


//displays
const displayCurrentMonthYear = document.getElementById("display-current-mont-year")
const displayMonth = document.getElementById("display-month")

displayCurrentMonthYear.textContent = `${new Date().toLocaleDateString('en-Us',{
  year: 'numeric',
  month: 'long',
})}`

//Display selected day
const displaySelectedDay = document.getElementById("display-selected-day")
const dailyTasks = document.getElementById("daily-tasks-container")
const eventList = document.getElementById('event-list')



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
    
    weeklyDayEl.addEventListener("click", () => {    
      
      renderSelectedDay(new Date(currentYear, currentMonth, mondayDate + i))

      document.querySelectorAll('.weekly-calendar-day').forEach(element => {
        element.classList.remove('selected-day');
    });
    
    weeklyDayEl.querySelector('.weekly-calendar-day').classList.add('selected-day') 

    })

    if(mondayDate + i === currentDate && weeklyCalendarNav === 0){
      weeklyDayEl.querySelector('.weekly-calendar-day').classList.add('current-day')
      weeklyDayEl.querySelector('.weekly-calendar-day').classList.add('selected-day') 
    }

    document.querySelector('#weekly-calendar').appendChild(weeklyDayEl);
    
  }

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

  openAddEventModalBtn.addEventListener('click', openAddEventModal)

  closeAddEventModalBtn.addEventListener('click', closeAddEventModal)

  saveEventBtn.addEventListener('click', saveEventToLocalStorage)
  
}


function openAddEventModal(){
  modalsOverlayBg.style.display = "block"
  dateInput.value = selectedDay.toLocaleDateString()
  
}

function closeAddEventModal(){
  eventInput.value = ''
  dateInput.value = ''
  modalsOverlayBg.style.display = "none"
  noteTextArea.value = ''
}

 function renderSelectedDay(date) {
  selectedDay = date
  const selectedDayString = selectedDay.toLocaleDateString()

  displaySelectedDay.innerHTML = selectedDayString
  eventList.innerHTML = ''
  
  //Loop through the array of objects
  for (const obj of events) {
    // Check if the current object's date matches the specific date
    if (obj.date === selectedDayString) {  
      // Loop through the eventsOnDate array for the current date
      for (const event of obj.eventsOnDate) {
        // Log each event's name

        const eventListItem = document.createElement('li')
        eventListItem.className = 'event-li'
        eventListItem.innerHTML = event.event 

        // Check if there's a note and add it to the list item
        if (event.note) {
          const noteParagraph = document.createElement('p');
          noteParagraph.className = 'note-paragraph'
          noteParagraph.textContent = `- ${event.note}`;
          
          eventListItem.appendChild(noteParagraph);
        }

        document.querySelector('#event-list').appendChild(eventListItem)
      }
    }
  }
 }


function saveEventToLocalStorage(){
  if(dateInput.value == '' || eventInput.value == ''){
    console.log("nothing happens")
  }
  else {
    
    let selectedDayString = selectedDay.toLocaleDateString()
    const eventThisDay = events.find(e => e.date === selectedDayString)
    
    if(eventThisDay){
      eventThisDay.eventsOnDate.push({
        event: eventInput.value,
        note: noteTextArea.value
      })
    }else{
    
      events.push({
        date: dateInput.value,
        eventsOnDate: [{
          event: eventInput.value,
          note: noteTextArea.value
        }]
      })
    }
    }

    localStorage.setItem("events", JSON.stringify(events))
    
    renderSelectedDay(selectedDay)
    closeAddEventModal()
}



renderSelectedDay(new Date())
initializingButtons()
renderWeeklyCalendar()

