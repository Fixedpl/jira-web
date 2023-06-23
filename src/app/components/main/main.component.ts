import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() currentUser: User;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.gerCurrentUser().subscribe((user: User) => {
    this.currentUser = user;
  });
}

  onLogoPressed(): void {
    this.router.navigate(['/dashboard']);
  }

  onLogoutPressed(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onProfileClicked(): void {
    console.log("Wszedłem");
    this.router.navigate(['/dashboard/account-view']);
  }

}
