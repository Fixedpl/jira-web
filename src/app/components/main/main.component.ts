import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogoPressed(): void {
    this.router.navigate(['/dashboard']);
  }

  onLogoutPressed(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
