//task Service
import {addTaskToDate} from './services/task.service.js'
//modal Service
import {closeAddModal,openAddModal} from './services/modal.service.js';

import { renderSelectedDay,renderWeeklyCalendar,selectedDay, changeWeek} from './services/calendar.service.js';

//task model class
import { saveTaskBtn } from './services/modal.service.js';
import { initCalendarBtns, initModalBtns } from './services/inti.service.js';


renderWeeklyCalendar()
initModalBtns()
initCalendarBtns()
renderSelectedDay()