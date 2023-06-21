import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserView} from "../models/user-view";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  BASE_PATH: string = 'api/v1/user/';

  constructor(private http: HttpClient) { }

  gerCurrentUser(): Observable<User> {
    return this.http.get<User>(this.BASE_PATH + '/getUser')
  }

  getById(id: number): Observable<UserView> {
    return this.http.get<UserView>(this.BASE_PATH + id);
  }

  editUser(user: User): Observable<void> {
    return this.http.post<void>(this.BASE_PATH, user);
  }

  getProjectMembers(projectId: number): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.BASE_PATH + projectId + '/members');
  }

  getProjectMembersBySprintId(sprintId: number): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_PATH + sprintId + '/sprintMembers')
  }

  addUserToProject(email: string, projectId: number): Observable<void> {
    return this.http.post<void>(
      this.BASE_PATH + projectId + '/members',
      {},
      { params: new HttpParams().set('email', email) })
  }
 

}
