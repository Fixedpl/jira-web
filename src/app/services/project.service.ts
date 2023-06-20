import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { CardProject } from '../models/card-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  BASE_PATH: string = 'api/v1/project/';

  constructor(private http: HttpClient) { }

  getProjectCards(): Observable<CardProject[]> {
    return this.http.get<CardProject[]>(this.BASE_PATH );
  }
  

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.BASE_PATH + id);
  }

  createProject(project: Project) {
    return this.http.post(this.BASE_PATH + '/create', project);
  }
 
}
// getProjects(): Observable<Project[]> {
//   return this.http.get<Project[]>(this.BASE_PATH);
// }