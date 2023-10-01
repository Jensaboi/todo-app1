import { openAddModal,closeAddModal, saveTaskBtn } from "./modal.service.js"
import { selectedDay } from "./calendar.service.js"
import { changeWeek, renderWeeklyCalendar, renderSelectedDay } from "./calendar.service.js"

export function initModalBtns () {

  document.getElementById("open-event-modal-btn").addEventListener('click', () =>{openAddModal(selectedDay)})

  document.getElementById("close-event-modal-btn").addEventListener('click', closeAddModal)

  document.getElementById("save-event-btn").addEventListener('click', saveTaskBtn)
  
 //constants.modalsOverlayBg.style.display = "none"
}

export function initCalendarBtns () {
  document.getElementById("weekly-back-btn").addEventListener('click',() => {
    changeWeek(true)
    renderWeeklyCalendar()
  })

  document.getElementById("weekly-next-btn").addEventListener('click',() => {
    changeWeek(false)
    renderWeeklyCalendar()
  })

}