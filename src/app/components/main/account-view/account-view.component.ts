import { Component, Input, OnInit } from '@angular/core';
import { UserView } from 'src/app/models/user-view';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})

export class AccountViewComponent implements OnInit {
  
  userInfo: UserView = new UserView;


  editingEnabled: boolean = false;
 
  constructor(
    private accountService: AccountService 
  ){ }

  ngOnInit(){
   
     this.updateInfo();   
 
  }
  enableEditing() {
    this.editingEnabled = true;
  }

  saveChanges() {
    this.accountService.updateUser(this.userInfo)
      .subscribe(respone => {});
    
  }
  updateInfo() {
    this.accountService.getActiveUser().subscribe(respone => {
      this.userInfo = respone;  
    });
    

    } 
}
  

