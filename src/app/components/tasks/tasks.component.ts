import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { TasksStoreService } from '../../services/tasks-store.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  constructor(public taskStoreService:TasksStoreService) {}

  tasks:any = [];

  form = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Priority: new FormControl('', [Validators.required, Validators.email]),
    Description: new FormControl('', Validators.required)
  });

  prioridad = [
    { 'id':1, 'name': 'Alta' },
    { 'id':2, 'name': 'Media' },
    { 'id':3, 'name': 'Baja' }
]
  tasksTrackFn = (i, task) => task.IdTask;

  onTaskAll(){
    this.tasks = this.taskStoreService.fetchAll();
  }

  ngOnInit(): void {
    this.onTaskAll();
  }

  onAddTask(taskData: Task){
    taskData.IdUser = 1,
    taskData.Status = 1,
    this.taskStoreService.addTask(taskData);
  }

  onDelete(id:number){
    this.taskStoreService.removeTask(id);
  }

  onSubmit(): void {
    this.onAddTask(this.form.value);
    if(this.form.status === 'VALID'){
        console.log(this.form.value);
        this.onAddTask(this.form.value);
      }
  }
}