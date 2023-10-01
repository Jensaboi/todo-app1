//time utility service
import {getDateNumber,getMonthYear,getWeekDayName,formatDateToYYYYMMDD,removeSelectedDay} from './time.utility.service.js';

//task Service
import {getTasks} from './task.service.js'

export let weeklyCalendarNav = 0;
export let selectedDay = new Date();
export const tasksFromLocalStorage = getTasks();
export let tasksOnDate = (tasksFromLocalStorage) ? tasksFromLocalStorage : {};


export function renderWeeklyCalendar(){
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
    
    if(currentWeekDayName === 0){
      currentWeekDayName = 7
    }
  
    const weeklyCalendar = document.getElementById("weekly-calendar")
    weeklyCalendar.innerHTML = ''
    //gets monday date of current week
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
export function renderSelectedDay(){
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

export function changeWeek(back)
{
    if(back)
      weeklyCalendarNav -= 7
    else
      weeklyCalendarNav +=7
}