import {main} from './js/main';
import {Task} from './js/counter';


import './index.html';
import './scss/index.scss';
import { Timer } from './js/timer';

main();
const timer = new Timer({timerTime: 25, timerPause: 5, timerBigPause: 15, tasks: []});
console.log('timer: ', timer);
timer.addTask(new Task('Решить задача модуля 8 урок 3', 0));
timer.activateTask(timer.tasks[0].id);

timer.startTask(timer.tasks[0].id);
console.log('timer: ', timer);
timer.startTask(timer.tasks[0].id);
console.log('timer: ', timer);
timer.startTask(timer.tasks[0].id);
console.log('timer: ', timer);

// const timer = setTimeout(() => {
//   const setInt = setInterval(() => {
//     console.log(`тик`);
//   }, 1000);
// }, 2500);


