import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Sprint } from '../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/v1/project');
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>('api/v1/project/' + id);
  }

}
