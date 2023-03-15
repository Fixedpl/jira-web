import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestModel } from './test-model';
import { Observable } from 'rxjs'

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

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get<TestModel>('/api/test').subscribe(res => console.log(res));
  }

}
