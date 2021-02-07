import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url = 'http://192.168.1.59/Tasks/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  
  constructor(private httpClient: HttpClient) { }

  getResponse(path){
    return this.httpClient.get(`${this.url}${path}`, { headers: this.headers });
  }

  getRequest(data, path){
    let urlPath = `${this.url}${path}`;
    return this.httpClient.post(urlPath, JSON.stringify(data), { headers: this.headers });
  }

  getRequetsDel(id, path){
    return this.httpClient.delete(`${this.url}${path}/${id}`, { headers: this.headers });
  }
}