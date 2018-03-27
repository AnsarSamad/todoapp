import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{ToDo} from  '../entity/ToDo';

@Injectable()
export class ToDoService{

    constructor(public http:HttpClient){
        console.log('todo app service get called');
    }

    addToDo(title:string){
        console.log('calling todoservice with title:'+title)
       return this.http.post<ToDo>('http://localhost:8080/todoservice/add?todo='+title,{});
    }

    remove(todoId){
       return this.http.post('http://localhost:8080/todoservice/remove?todoId='+todoId,{});
    }

    update(todo:ToDo){
        console.log('updating todo :'+todo)
       return this.http.post('http://localhost:8080/todoservice/update',todo);
    }
}