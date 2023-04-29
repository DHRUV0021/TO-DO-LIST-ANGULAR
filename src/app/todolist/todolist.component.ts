import { Component, OnInit } from '@angular/core';
import { CrudService, TodoData } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit{

  task!:TodoData;
  allData:Array<TodoData>=new Array<TodoData>();
  toggaleButton:boolean=false;

  constructor( private data:CrudService,
               private toastr: ToastrService) {}

  ngOnInit() {
    this.task=new TodoData;
    this.getData();
  }


  // ===================== DATA ADD METHOD  =====================
  addData(){
    if(this.task.taskName){
      
      this.data.addTask(this.task).subscribe({        
        next:(res)=>{
          console.log("okkk" , res);
          this.getData();
          this.task=new TodoData;
        },    
        error:(err)=>{
          console.log(err);
        },    
        complete:()=>{
        }
      })
    }
    else{
      this.toastr.warning('plese enter your task');
    }
  }

   // ===================== DATA GET METHOD  =====================
  getData(){
    this.data.getTask().subscribe({
      next:(res:any)=>{
        this.allData=res;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("success");
      }
    })
  }

   // ===================== DATA DELETE METHOD  =====================
  deleteData(data:TodoData){
    this.data.deleteTask(data.id).subscribe({
      next:(res)=>{
        this.getData();
        console.log(res);
        this.task=new TodoData;
        this.toggaleButton=false;
        this.toastr.success('your data deleted');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

   // ===================== DATA EDIT METHOD  =====================
   fillData(data:TodoData){
    this.task=data;
    this.toggaleButton=true;
   }

   // ===================== DATA UPDATE METHOD  =====================
  updateData(){
    this.data.updateTask(this.task).subscribe({
      next:(res)=>{
        console.log(res);
        this.task=new TodoData;
        this.toggaleButton=false;
        this.toastr.success('your data updated');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
