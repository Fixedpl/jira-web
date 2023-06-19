
export class UserView {

  id: number;
  email: string;
  firstName: string;
  lastName: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
