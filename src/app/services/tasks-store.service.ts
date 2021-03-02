import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TasksService } from './tasks.service';
import { Task } from '../models/Task';

@Injectable({ providedIn:'root' })

export class TasksStoreService {
  constructor(private taskService:TasksService) { this.fetchAll() }

  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks.asObservable();

  readonly completeTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.isCompleted))
  )
  readonly unCompleteTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.isCompleted))
  )

    get tasks(): Task[]{
      return this._tasks.getValue();
    }

    set tasks(val: Task[]){
      this._tasks.next(val);
    }

    async addTask(taskData: Task){
        this.tasks = [...this.tasks, taskData];
  
        try{
          const task = await this.taskService
            .post(taskData, 'tasks')
            .toPromise();
  
            const index = this.tasks.indexOf(this.tasks.find(t => t.IdTask === taskData.IdTask))
            this.tasks[index] = {
              ...task
            }
            this.tasks = [...this.tasks];
          }catch(e){
            console.log(e);
        }
  
      }
  
  async fetchAll(){
    return await this.taskService.get('tasks').toPromise();
  }
  
  async removeTask(id: number){
    const task = this.tasks.find(t => t.IdTask === id);
    this.tasks = this.tasks.filter(task => task.IdTask !== id);
  
    try{
      await this.taskService.delete(id, 'tasks').toPromise();
    }catch(e){
      console.log(e);
      this.tasks = [...this.tasks, task];
    }
  }
  
  async setCompleted(id: number, isCompleted: boolean) {
    let task = this.tasks.find(task => task.IdTask === id);
  
    if(task) {
      const index = this.tasks.indexOf(task);
  
      this.tasks[index] = {
        ...task,
        isCompleted
      }
  
      this.tasks = [...this.tasks];
  
      try {
        await this.taskService
          .put(id, isCompleted)
          .toPromise();
  
      } catch (e) {
  
        console.error(e);
        this.tasks[index] = {
          ...task,
          isCompleted: !isCompleted
        }
      }
    }
  }

}