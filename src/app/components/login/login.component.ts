import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'jira-web';

  posts: any;

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  readonly APP_URL = 'http://localhost:8080'

  email: string;
  password: string;
  remail: string;
  rpassword: string;
  rcpassword: string;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  register() {
    this.authService.register(this.remail, this.rpassword)
      .subscribe(res => {
        this.authService.setSession(res.token);
        this.router.navigate(['/']);
      });
  }

  login() {
    this.authService.logout();
    this.authService.login(this.email, this.password)
      .subscribe(res => {
        this.authService.setSession(res.token);
        this.router.navigate(['/']);
      });
  }
}
