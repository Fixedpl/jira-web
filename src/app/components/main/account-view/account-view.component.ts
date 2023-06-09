import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
  username: string;
  role: string;
};


@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})

export class AccountViewComponent {
  
  user: User;
  
}
