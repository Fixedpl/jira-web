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

  getById(id: number): Observable<UserView> {
    return this.http.get<UserView>(this.BASE_PATH + id);
  }

  editUser(user: User): Observable<void> {
    return this.http.post<void>(this.BASE_PATH, user);
  }

  getProjectMembers(projectId: number): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.BASE_PATH + projectId + '/members');
  }

  addUserToProject(email: string, projectId: number): Observable<void> {
    return this.http.post<void>(
      this.BASE_PATH + projectId + '/members',
      {},
      { params: new HttpParams().set('email', email) })
  }

}
