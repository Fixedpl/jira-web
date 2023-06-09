import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Sprint } from '../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  BASE_PATH: string = 'api/v1/project/';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.BASE_PATH);
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.BASE_PATH + id);
  }

}
