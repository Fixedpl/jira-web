import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_PATH: string = 'api/v1/task/comment/';

  constructor(private http: HttpClient) { }

  getCommentsByTaskId(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(this.BASE_PATH + taskId);
  }

  createComment(comment: TaskComment, taskId: number) {
    return this.http.post(this.BASE_PATH + taskId, comment);
  }
}
