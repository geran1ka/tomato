import {ImportantTask, StandartTask, UnimportantTask} from '../../Task';
import {main} from '../../main';
import {Main} from '../Main/Main';
import {addContainer} from '../addContainer';

export class SectionMain {
  static instance;
  constructor(storage, state, timer) {
    if (!SectionMain.instance) {
      SectionMain.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('main');
      this.containerElement = addContainer(this.element, 'main');
      this.isMounted = false;
      this.storage = storage;
      this.todoList = storage.get();
      this.state = state;
      this.timer = timer;
    }

    return SectionMain.instance;
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    const windowWrapper = document.createElement('div');
    windowWrapper.classList.add('pomodoro-form', 'window');

    const windowPanel = this.getWindowPanel(this.state);
    const windowBody = this.getWindowBody('30:00');
    const form = this.getForm();
    const pomodoroTasks = this.getPomodoroTasks(this.todoList);


    windowWrapper.append(windowPanel, windowBody, form, pomodoroTasks);

    this.element.append(windowWrapper);
    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getWindowPanel(state) {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');

    const windowPanelTitle = document.createElement('p');
    windowPanelTitle.classList.add('window__panel-title');
    windowPanelTitle.textContent = state.activeTodo?.title || '';

    const windowPanelTaskText = document.createElement('p');
    windowPanelTaskText.classList.add('window__panel-task-text');
    windowPanelTaskText.textContent = state.activeTodo?.count || 0;

    windowPanel.append(windowPanelTitle, windowPanelTaskText);
    return windowPanel;
  }

  getWindowBody(time) {
    const windowBody = document.createElement('div');
    windowBody.classList.add('window__body');

    const windowTimerText = document.createElement('p');
    windowTimerText.classList.add('window__timer-text');
    windowTimerText.textContent = time;


    const windowsButtons = document.createElement('div');
    windowsButtons.classList.add('window__buttons');

    const startBtn = document.createElement('button');
    startBtn.classList.add('button', 'button-primary');
    startBtn.textContent = 'Старт';

    startBtn.addEventListener('click', () => {
      this.timer.startTimer(windowTimerText);
    });

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('button', 'button-secondary');
    stopBtn.textContent = 'Стоп';

    stopBtn.addEventListener('click', () => {
      this.timer.stop();
    });

    windowsButtons.append(startBtn, stopBtn);
    windowBody.append(windowTimerText, windowsButtons);
    return windowBody;
  }

  getForm() {
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.action = 'submit';

    const input = document.createElement('input');
    input.classList.add('task-name', 'input-primary');
    input.type = 'text';
    input.name = 'task-name';
    input.id = 'task-name';
    input.dataset.important = 'default'
    input.placeholder = 'название задачи';

    const btnImportant = document.createElement('button');
    btnImportant.classList.add('button', 'button-importance', 'default');
    btnImportant.type = 'button';
    btnImportant.ariaLabel = 'Указать важность';
    let count = 0;
    const imp = ['default', 'important', 'so-so'];
    btnImportant.addEventListener('click', ({target}) => {
      count += 1;
      if (count >= imp.length) {
        count = 0;
      }
  
      for (let i = 0; i < imp.length; i++) {
        if (count === i) {
          target.classList.add(imp[i]);
        } else {
          target.classList.remove(imp[i]);
        }
      }
      input.dataset.important = imp[count]
    });

    main(btnImportant);

    const btnAdd = document.createElement('button');
    btnAdd.classList.add('button', 'button-primary', 'task-form__add-button');
    btnAdd.type = 'button';
    btnAdd.textContent = 'Добавить';


    btnAdd.addEventListener('click', () => {
      const list = document.querySelector('.pomodoro-tasks__quest-tasks');
      const importance = input.dataset.important
      console.log('importance: ', importance);
      const task = importance === 'important' ?
        new ImportantTask(input.value) :
        importance === 'so-so' ?
          new StandartTask(input.value) : new UnimportantTask(input.value)
      list.prepend(this.addTask(task))
      this.storage.set(task);

      input.value = '';
    });

    form.append(input, btnImportant, btnAdd);

    return form;
  }

  getPomodoroTasks(todoList) {
    const pomodoroTasks = document.createElement('div');
    pomodoroTasks.classList.add('pomodoro-tasks');

    const pomodoroTasksHeaderTitle = document.createElement('p');
    pomodoroTasksHeaderTitle.classList.add('pomodoro-tasks__header-title');
    pomodoroTasksHeaderTitle.textContent = 'Инструкция:';

    const arr = [
      'Напишите название задачи чтобы её добавить',
      'Чтобы задачу активировать, выберите её из списка',
      'Запустите таймер',
      'Работайте пока таймер не прозвонит',
      'Сделайте короткий перерыв (5 минут)',
      'Продолжайте работать, пока задача не будет выполнена.',
      'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).',
    ];

    const pomodoroTasksQuestList = document.createElement('ul');
    pomodoroTasksQuestList.classList.add('pomodoro-tasks__quest-list');

    const pomodoroTasksQuestListItems = arr.map(item => {
      const li = document.createElement('li');
      li.classList.add('pomodoro-tasks__list-item');
      li.textContent = item;

      return li;
    });

    pomodoroTasksQuestList.append(...pomodoroTasksQuestListItems);

    const pomodoroTasksQuestListTasks = document.createElement('ul');
    pomodoroTasksQuestListTasks.classList.add('pomodoro-tasks__quest-tasks');
    if (todoList) {
      const pomodoroTasksQuestListTasksItems = todoList.map(item => {
        return this.addTask(item);
      });  
      pomodoroTasksQuestListTasks.append(...pomodoroTasksQuestListTasksItems);
    } else {
      const li = document.createElement('li');
      li.classList.add('pomodoro-tasks__list-task');

      const link = document.createElement('a');
      link.classList.add('pomodoro-tasks__task-text');
      link.href = '#task-name';
      link.textContent = 'Добавить задачу';

      li.append(link);
      pomodoroTasksQuestListTasks.append(li);
    }

    const pomodoroTasksDeadlineTimer = document.createElement('p');
    pomodoroTasksDeadlineTimer.classList.add('pomodoro-tasks__deadline-timer');
    pomodoroTasksDeadlineTimer.textContent = '1 час 30 мин';


    
    pomodoroTasks.append(pomodoroTasksHeaderTitle, pomodoroTasksQuestList, pomodoroTasksQuestListTasks, pomodoroTasksDeadlineTimer);

    return pomodoroTasks;
  }

  addTask(task) {
    const li = document.createElement('li');
    li.classList.add(`pomodoro-tasks__list-task`,
        `${task.importance === 'important' ?
        'important' : task.importance === 'standart' ? 'so-so' : 'default'}`,
    );
    li.dataset.importance =`${task.importance === 'important' ?
    'important' : task.importance === 'standart' ? 'so-so' : 'default'}`;
    li.id = task.id;


    const span = document.createElement('span');
    span.classList.add('count-number');
    span.textContent = task._count;

    const btn = document.createElement('button');
    btn.classList.add('pomodoro-tasks__task-text', 'pomodoro-tasks__task-text_active');
    btn.textContent = task._title;
    btn.addEventListener('click', () => {
      this.state.activeTodo = task;
      const title = document.querySelector('.window__panel-title');
      const count = document.querySelector('.window__panel-task-text');
      title.textContent = this.state.activeTodo._title;
      this.state.status = 'work';
    })

    const btnTwo = document.createElement('button');
    btnTwo.classList.add('pomodoro-tasks__task-button');

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('burger-popup');
    btnTwo.addEventListener('click', ({target}) => {
      btnWrapper.classList.toggle('burger-popup_active');

    });

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('popup-button', 'burger-popup__edit-button');
    btnEdit.textContent = 'Редактировать';
    btnEdit.addEventListener('click', ({target}) => {
      const input = document.querySelector('.task-name');
      const btnImportant = document.querySelector('.button-importance');
      const item =  target.closest('.pomodoro-tasks__list-task');
      const editTodo = target.closest('.pomodoro-tasks__list-task');
      btnImportant.className = `button button-importance ${item.dataset.importance}`;
      btnWrapper.classList.toggle('burger-popup_active');

      input.value = item.querySelector('.pomodoro-tasks__task-text').textContent;
      input.focus();
      this.storage.delete(editTodo);
      editTodo.remove();
    });

    const btnDel = document.createElement('button');
    btnDel.classList.add('popup-button', 'burger-popup__delete-button');
    btnDel.textContent = 'Удалить';
    btnDel.addEventListener('click', ({target}) => {
        const delTodo = target.closest('.pomodoro-tasks__list-task');
        delTodo.remove();
        this.storage.delete(delTodo);
    });

    btnWrapper.append(btnEdit, btnDel);
    li.append(span, btn, btnTwo, btnWrapper);

    return li;
  }
}
