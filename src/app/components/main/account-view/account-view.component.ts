import { Component } from '@angular/core';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})

export class AccountViewComponent {
  
  editingEnabled: boolean = false;
  firstName: string = 'Karol';
  lastName: string = 'Wojtyła';
  country: string = 'Polska';
  birthday: string = '13 July 1983';
  position: string = 'Papież';
  email: string = 'jp2137@kremowki.com';
  phoneNumber: string = '88 (02) 123456';

  enableEditing() {
    this.editingEnabled = true;
  }

  saveChanges() {
    this.editingEnabled = false;
    // Tutaj możesz wykonać dodatkowe operacje, takie jak zapisanie zmian do serwera.
  }
 
  
}
