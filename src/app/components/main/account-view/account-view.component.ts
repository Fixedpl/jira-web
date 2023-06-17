import { Component, Input } from '@angular/core';
import { UserView } from 'src/app/models/user-view';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})

export class AccountViewComponent {
  
  userInfo: UserView;
  userService: UserService;

  editingEnabled: boolean = false;
  firstName: string = 'Karol';
  lastName: string = 'Wojtyła';
  country: string = 'Polska';
  birthday: string = '13 July 1983';
  position: string = 'Papież';
  email: string = 'jp2137@kremowki.com';
  phoneNumber: string = '88 (02) 123456';
  avatar: Uint8Array;

  ngOnInit(){
    
    this.updateInfo();
    this.firstName = this.userInfo.email;
 
  }
  enableEditing() {
    this.editingEnabled = true;
  }

  saveChanges() {
    this.editingEnabled = false;
    // Tutaj możesz wykonać dodatkowe operacje, takie jak zapisanie zmian do serwera.
  }
  updateInfo() {[[]]
    this.userService.getActiveUser().subscribe((respone: UserView) =>{
      this.userInfo = respone;  
    });
    

    } 
}
  

