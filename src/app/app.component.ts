import { Component } from '@angular/core';
import {ToDo} from './entity/ToDo';
import {ToDoService} from  './service/todo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo:string="";
  todos = new Array<ToDo>();
  validToDo:boolean = true;

  constructor(private  todoService:ToDoService){

  }

  addTodo(){
    if(this.newTodo.trim().length <= 0){
      this.validToDo  =  false;
      return;
    }
    this.todoService.addToDo(this.newTodo)
    .subscribe((result:ToDo)=>{
      this.newTodo = "";
      this.todos.push(result);
    })    
  }

  toggleTodoComplete(todo:ToDo){
    let index = this.todos.indexOf(todo,0);
    console.log('found todo in index:'+index);
    if(todo.complete){
      todo.complete = false;
    }else{
      todo.complete =  true;
    }
    
    if (index > -1) {
      this.todos.splice(index, 1);
   }
    this.todoService.update(todo)
    .subscribe((result:ToDo)=>{
      console.log('todo updated result:'+JSON.stringify(result));
      this.todos.push(result);     
    })
  } 

  removeTodo(todo:ToDo){
    console.log('selected todo:'+JSON.stringify(todo))
    let index = this.todos.indexOf(todo,0);
    this.todoService.remove(todo.id)
    .subscribe((result)=>{
      if(result){
        this.todos.splice(index, 1);
      }
    })
  }
}
