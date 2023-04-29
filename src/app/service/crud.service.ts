import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  jsonurl:string;

  constructor(private http:HttpClient) {

    this.jsonurl='http://localhost:3000/todos';
   }

   getTask(){
    return this.http.get(this.jsonurl);
   }

   addTask(body:TodoData){
    return this.http.post(this.jsonurl,body);
   }

   deleteTask(body:any){
    return this.http.delete(this.jsonurl+"/"+body); 
   }

   updateTask(body:TodoData){
    return this.http.put(this.jsonurl+"/"+body.id,body);
   }
}

export class TodoData{
  taskName!:string;
  id!:number;
  
}
