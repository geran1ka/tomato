export class StorageTask {
  constructor(key = 'pomodoro') {
    this.key = key;
    this.todoList = this.get();
  }

  get() {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

    return todoList;
  }

  set(data) {
    const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');
    todoList.push(data);
    localStorage.setItem('pomodoro',  JSON.stringify(todoList));
  }

  edit(todo) {
    const todoList = this.get();
    const item = todoList.find((item) => item.id !== todo.id);
    item.title = todo.title;
    item.importance = todo.importance;
    console.log(todoList);
  
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
  }


  delete(todo) {
    const todoList = this.get();
    const newTodoList = todoList.filter((item) => item.id !== todo.id);
  
    localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
  }
}
