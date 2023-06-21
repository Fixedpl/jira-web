
export class UserView {

  id: number;
  username: string = 'Username';
  location: string = 'Lublin';
  organizationName: string ='Umcs';
  firstName: string = 'Karol';
  lastName: string = 'Wojtyła';
  country: string = 'Polska';
  birthday: string = '13 July 1983';
  email: string = 'jp2137@kremowki.com';
  phoneNumber: string = '88 (02) 123456';
  avatar: string;


  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
