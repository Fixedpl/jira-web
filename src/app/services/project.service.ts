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

  getSprints(id: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>('api/v1/project/' + id + '/sprint');
  }
  createProject(project: Project) {
        
    return this.http.post('/api/v1/project/create', {project});
}

}
