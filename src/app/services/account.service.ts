import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserView } from '../models/user-view';
import { ImageModel } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BASE_PATH: string = 'api/v1/account/'

  constructor(private http: HttpClient) { }
  
  getActiveUser(): Observable<UserView> {
    return this.http.get<UserView>(this.BASE_PATH + 'user');
  }
  updateUser(userView: UserView): Observable<void> {
    return this.http.post<void>(this.BASE_PATH + 'user',userView);  
  }
  updateUserAvatar(formData:FormData) {
    return this.http.post('/api/v1/image/upload', formData).subscribe(          
      (response) =>console.log(response),   
      (error) =>console.log(error)  
    )}
  
  getAvatar(): Observable<ImageModel> {
    return this.http.get<ImageModel>('api/v1/image/get/dora.jpg');
  }
}
  
  

