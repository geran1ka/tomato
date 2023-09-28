import {main} from './js/main';
import {Counter} from './js/counter';


import './index.html';
import './scss/index.scss';

main();
const counter = new Counter('Решить задача модуля 8 урок 3', 1);

console.log(counter);
console.log(counter.count = 2);
console.log(counter.name = 'Решено');
console.log(counter);

