import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{ToDo} from  '../entity/ToDo';

@Injectable()
export class ToDoService{

    serverUrl : string;
    constructor(private http:HttpClient){
        this.fetchConfig();
    }

    fetchConfig(){
        return this.http.get('./assets/config.json')
        .subscribe((res)=>{
            this.serverUrl =  res['server.url'];
        });
    }
    addToDo(title:string){
       return this.http.post(this.serverUrl+'/add',title);
    }

    remove(todoId){
       return this.http.post(this.serverUrl+'/remove',todoId);
    }

    update(todo:ToDo){
       return this.http.post(this.serverUrl+'/update',todo);
    }
}