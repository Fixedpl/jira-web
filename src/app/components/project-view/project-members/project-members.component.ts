import {ChangeDetectorRef, Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UserView} from "../../../models/user-view";
import {UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.scss']
})
export class ProjectMembersComponent implements OnChanges {

  @Input() projectId: number | null = null;

  employees: UserView[] = [];

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadMembers();
  }

  openAddMemberDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddMemberDialog, {
      data: this.projectId,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(memberAdded => {
      if(memberAdded) {
        this.loadMembers();
      }
    });
  }

  loadMembers(): void {
    if(this.projectId) {
      this.userService.getProjectMembers(this.projectId).subscribe({
        next: users => {
          this.employees = users;
          console.log(users);
        },
        error: err => {
          this.snackBar.open('Nie udało się pobrać członków projektu');
          console.log(err);
        }
      });
    }
  }

}

@Component({
  selector: 'add-member-dialog',
  templateUrl: 'add-member-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
})
export class AddMemberDialog {

  email: string;

  constructor(
    public dialogRef: MatDialogRef<AddMemberDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public projectId: number,
    private snackBar: MatSnackBar
  ) {}

  onDodaj(): void {
    this.userService.addUserToProject(this.email, this.projectId).subscribe({
      complete: () => {
        this.snackBar.open('Pomyślnie dodano użytkownika do projektu')
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open('Nie udało się dodać użytkownika do projektu')
        console.log(err);
      }
    });
  }

  onAnuluj(): void {
    this.dialogRef.close(false);
  }

}
