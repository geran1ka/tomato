import {main} from './js/main';
import {ImportantTask, Task} from './js/Task';
import {Timer} from './js/Timer';


import './index.html';
import './scss/index.scss';

main();
const timer = new Timer({timerTime: 25, timerPause: 10, timerBigPause: 15, tasks: []});
console.log(new Timer({timerTime: 0.6, timerPause: 0.2, timerBigPause: 0.4, tasks: []}));
console.log(new Timer({timerTime: 50, timerPause: 10, timerBigPause: 15, tasks: []}));

timer.addTask(new ImportantTask('Решить задача модуля 8 урок 3'));
timer.activateTask(timer.tasks[0].id);

timer.startTask(timer.tasks[0].id);
console.log('timer: ', timer);
// timer.startTask(timer.tasks[0].id);
// console.log('timer: ', timer);
// timer.startTask(timer.tasks[0].id);
// console.log('timer: ', timer);


