import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks;

  form = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Priority: new FormControl('', [Validators.required, Validators.email]),
    Description: new FormControl('', Validators.required)
  });

  constructor(private service:TasksService) { }

  ngOnInit(): void {
    this.service.getResponse('tasks')
      .subscribe(response => {
        this.tasks = response;
      })
  }

  onSubmit(): void {
    let data = { 
      IdUser: 1, 
      Name: this.form.value.Name, 
      Priority: this.form.value.Priority,
      Description: this.form.value.Description,
      Status: 1
    }
    this.createTask(data);

    if(this.form.status === 'VALID'){
        console.log(this.form.value);
        this.createTask(this.form.value);
      }
  }

  createTask(form){
    this.service.getRequest(form, 'tasks')
              .subscribe((response: { IdTask }) => {
                form['IdTask'] = response.IdTask;
                this.tasks.splice(0, 0, form);
              })
  }
}