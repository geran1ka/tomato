import {main} from '../../main';
import {addContainer} from '../addContainer';

export class SectionMain {
  static instance;
  constructor() {
    if (!SectionMain.instance) {
      SectionMain.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('main');
      this.containerElement = addContainer(this.element, 'main');
      this.isMounted = false;
    }

    return SectionMain.instance;
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    const windowWrapper = document.createElement('div');
    windowWrapper.classList.add('pomodoro-form', 'window');

    const windowPanel = this.getWindowPanel('Сверстать сайт', 'Томат 2');
    const windowBody = this.getWindowBody('30:00');
    const form = this.getForm();
    const pomodoroTasks = this.getPomodoroTasks([
      {
        id: 286,
        text: 'Решить задачу',
        count: 0,
        important: 'важная',
      },
      {
        id: 287,
        text: 'Сверстать сайт',
        count: 0,
        important: 'стандартная',
      },
      {
        id: 288,
        text: 'Поспать',
        count: 0,
        important: 'неважная',
      },
    ]);

    windowWrapper.append(windowPanel, windowBody, form, pomodoroTasks);

    this.element.append(windowWrapper);
    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getWindowPanel(name, count) {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');

    const windowPanelTitle = document.createElement('p');
    windowPanelTitle.classList.add('window__panel-title');
    windowPanelTitle.textContent = name;

    const windowPanelTaskText = document.createElement('p');
    windowPanelTaskText.classList.add('window__panel-task-text');
    windowPanelTaskText.textContent = count;

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
      console.log('старт таймера');
    });

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('button', 'button-secondary');
    stopBtn.textContent = 'Стоп';

    stopBtn.addEventListener('click', () => {
      console.log('стоп таймера');
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
    input.placeholder = 'название задачи';

    const btnImportant = document.createElement('button');
    btnImportant.classList.add('button', 'button-importance', 'default');
    btnImportant.type = 'button';
    btnImportant.ariaLabel = 'Указать важность';

    main(btnImportant);

    const btnAdd = document.createElement('button');
    btnAdd.classList.add('button', 'button-primary', 'task-form__add-button');
    btnAdd.type = 'button';
    btnAdd.textContent = 'Добавить';

    btnAdd.addEventListener('click', () => {
      const task = input.value;
      console.log(`Добавить задачу ${task}`);
      input.value = '';
    });

    form.append(input, btnImportant, btnAdd);

    return form;
  }

  getPomodoroTasks(arrTask) {
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

    const pomodoroTasksQuestListTasksItems = arrTask.map(item => {
      const li = document.createElement('li');
      li.classList.add(`pomodoro-tasks__list-task`, 
        `${item.important === 'важная' ? 
          'important' : item.important === 'стандартная' ? 'so-so' : 'default'}`
        );
        li.id = item.id;

      const span = document.createElement('span');
      span.classList.add('counter-number');
      span.textContent = item.count;

      const btn = document.createElement('button');
      btn.classList.add('pomodoro-tasks__task-text', 'pomodoro-tasks__task-text_active');
      btn.textContent = item.text;

      const btnTwo = document.createElement('button');
      btnTwo.classList.add('pomodoro-tasks__task-button');

      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('burger-popup');
      btnTwo.addEventListener('click', () => {
        console.log('popup');
        btnWrapper.classList.toggle('burger-popup_active');
      })

      const btnEdit = document.createElement('button');
      btnEdit.classList.add('popup-button', 'burger-popup__edit-button');
      btnEdit.textContent = 'Редактировать';
      btnEdit.addEventListener('click', () => {
        console.log('edit');
        btnWrapper.classList.toggle('burger-popup_active');
      })

      const btnDel = document.createElement('button');
      btnDel.classList.add('popup-button', 'burger-popup__delete-button');
      btnDel.textContent = 'Удалить';
      btnDel.addEventListener('click', () => {
        console.log('del');
      })

      btnWrapper.append(btnEdit, btnDel);
      li.append(span, btn, btnTwo, btnWrapper);
      console.log('li: ', li);

      return li;
    });

    pomodoroTasksQuestListTasks.append(...pomodoroTasksQuestListTasksItems);
    pomodoroTasks.append(pomodoroTasksHeaderTitle, pomodoroTasksQuestList, pomodoroTasksQuestListTasks);

    return pomodoroTasks;
  }
}

{/*      <ul class="pomodoro-tasks__quest-tasks">
            <li class="pomodoro-tasks__list-task important">
              <span class="count-number">1</span>
              <button class="pomodoro-tasks__task-text pomodoro-tasks__task-text_active">
                Сверстать сайт
              </button>
              <button class="pomodoro-tasks__task-button"></button>
              <!-- popup menu -->
              <div class="burger-popup burger-popup_active">
                <button class="popup-button burger-popup__edit-button">Редактировать</button>
                <button class="popup-button burger-popup__delete-button">Удалить</button>
              </div>
            </li>
            <li class="pomodoro-tasks__list-task so-so">
              <span class="count-number">1</span>
              <button class="pomodoro-tasks__task-text">
                Оплатить налоги
              </button>
              <button class="pomodoro-tasks__task-button"></button>
              <!-- popup menu -->

            </li>
            <li class="pomodoro-tasks__list-task default">
              <span class="count-number">3</span>
              <button class="pomodoro-tasks__task-text">
                Проверить валидность
              </button>
              <button class="pomodoro-tasks__task-button"></button>
            </li>
          </ul>
          <p class="pomodoro-tasks__deadline-timer">1 час 30 мин</p>
        </div> */}
