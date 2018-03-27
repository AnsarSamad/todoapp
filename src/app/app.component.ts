import { Component } from '@angular/core';
import { ToDo } from './entity/ToDo';
import { ToDoService } from './service/todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo: string = "";
  todos = new Array<ToDo>();
  validToDo: boolean = true;
  todo_alreadyExist: boolean = false;

  constructor(private todoService: ToDoService) {

  }

  addTodo() {
    this.resetValidation();
    if (this.newTodo.trim().length == 0) {
      this.validToDo = false;
      return;
    }
    if (this.isToDoExist()) {
      this.todo_alreadyExist = true;
      return;
    }

    this.todoService.addToDo(this.newTodo.trim())
      .subscribe((result: ToDo) => {
        this.newTodo = "";
        this.todos.push(result);
      })
  }

  toggleTodoComplete(todo: ToDo) {
    this.resetValidation();
    let index = this.todos.indexOf(todo, 0);
    if (todo.complete) {
      todo.complete = false;
    } else {
      todo.complete = true;
    }
    this.todoService.update(todo)
      .subscribe((result: ToDo) => {
        if (index > -1) {
          this.todos.splice(index, 1);
        }
        this.todos.push(result);
      })
  }

  removeTodo(todo: ToDo) {
    this.resetValidation();
    let index = this.todos.indexOf(todo, 0);
    this.todoService.remove(todo.id)
      .subscribe((result) => {
        if (result) {
          this.todos.splice(index, 1);
        }
      })
  }

  isToDoExist() {
    var selected = this.todos.filter(todo => todo.title.trim() == this.newTodo.trim())
    return selected.length;
  }

  resetValidation() {
    this.validToDo = true;
    this.todo_alreadyExist = false;
  }
}
