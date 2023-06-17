import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  BASE_PATH: string = 'api/v1/sprint/';

  constructor(private http: HttpClient) { }

  getSprints(projectId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.BASE_PATH + projectId);
  }

  addSprint(sprint: Sprint): Observable<void> {
    return this.http.post<void>(this.BASE_PATH, sprint);
  }

  startSprint(id: number): Observable<void> {
    return this.http.get<void>(this.BASE_PATH + id + '/start');
  }

  endSprint(id: number): Observable<void> {
    return this.http.get<void>(this.BASE_PATH + id + '/end');
  }

}
