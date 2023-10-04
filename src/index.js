import {main} from './js/main';
import {Task} from './js/counter';


import './index.html';
import './scss/index.scss';
import { Timer } from './js/timer';

main();
const timer = new Timer({timerTime: 0.6, timerPause: 0.2, timerBigPause: 0.4, tasks: []});
timer.addTask(new Task('Решить задача модуля 8 урок 3', 0));
timer.activateTask(timer.tasks[0].id);

timer.startTask(timer.tasks[0].id);
console.log('timer: ', timer);
// timer.startTask(timer.tasks[0].id);
// console.log('timer: ', timer);
// timer.startTask(timer.tasks[0].id);
// console.log('timer: ', timer);




