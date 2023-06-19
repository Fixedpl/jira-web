import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_PATH: string = 'api/v1/task/';

  constructor(private http: HttpClient) { }

  getTaskById(taskId: number) : Observable<Task> {
    return this.http.get<Task>(this.BASE_PATH + taskId)
  }

  addTask(task: Task): Observable<void> {
    return this.http.put<void>(this.BASE_PATH + '/update', task);
  }
}
