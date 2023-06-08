import { Component } from '@angular/core';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})

export class AccountViewComponent {
  
name: string = "Robert";
email: string = "hasło_do_bazy_to_kris";
username: string = "jestem_kris";
role: string;
  
  
  
}
