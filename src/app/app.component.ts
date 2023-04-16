import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestModel } from './test-model';
import { Observable } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jira-web';

  posts: any;

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  readonly APP_URL = 'http://localhost:8080'

  email: string;
  password: string;
  remail: string;
  rpassword: string;
  rcpassword: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getPosts() {
    this.posts = this.http.get<TestModel>('/api/test').subscribe(res => console.log(res));
  }

  register() {

  }

  login() {
    if(this.email=="admin" && this.password=="admin"){
        this.snackBar.open('Login Successful','',{duration:1000})
    }else{
      this.snackBar.open('Login error','',{duration:1000})
    }
  }

}
