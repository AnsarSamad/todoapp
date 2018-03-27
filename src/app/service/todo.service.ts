import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{ToDo} from  '../entity/ToDo';

@Injectable()
export class ToDoService{

    constructor(public http:HttpClient){
        console.log('todo app service get called');
    }

    addToDo(title:string){
       return this.http.post<ToDo>('http://localhost:8080/todoservice/add',title);
    }

    remove(todoId){
       return this.http.post('http://localhost:8080/todoservice/remove',todoId);
    }

    update(todo:ToDo){
       return this.http.post('http://localhost:8080/todoservice/update',todo);
    }
}