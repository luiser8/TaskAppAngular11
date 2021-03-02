import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  private url = 'http://192.168.1.59/Tasks/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  
  constructor(private httpClient: HttpClient) { }

  get(path){
    return this.httpClient.get<Task>(`${this.url}${path}`, { headers: this.headers });
  }

  post(data, path){
    let urlPath = `${this.url}${path}`;
    return this.httpClient.post<Task>(urlPath, JSON.stringify(data), { headers: this.headers });
  }

  put(data, path){
    let urlPath = `${this.url}${path}`;
    return this.httpClient.put<Task>(urlPath, JSON.stringify(data), { headers: this.headers });
  }

  delete(id, path){
    return this.httpClient.delete<Task>(`${this.url}${path}/${id}`, { headers: this.headers });
  }
}