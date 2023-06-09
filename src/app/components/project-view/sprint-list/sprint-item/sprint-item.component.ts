import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-sprint-item',
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent {
  @Input() sprint: Sprint;
  @Input() sprintStartable: boolean = false;
  @Input() sprintFinishable: boolean = false;
  @Input() highlight: boolean = false;
  @Output() sprintStarted = new EventEmitter<Sprint>();
  @Output() sprintFinished = new EventEmitter<Sprint>();
  @Output() sprintPressed = new EventEmitter<Sprint>();

  constructor(public dialog: MatDialog) { }

  onSprintPressed(sprint: Sprint): void {
    this.sprintPressed.emit(sprint);
  }

  openConfirmSprintStartDialog(sprint: Sprint, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmSprintStartDialog, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(isConfirm => {
      if(isConfirm) {
        this.sprintStarted.emit(sprint);
      }
    });
  }

  openConfirmSprintEndDialog(sprint: Sprint, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmSprintEndDialog, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(isConfirm => {
      if(isConfirm) {
        this.sprintFinished.emit(sprint);
      }
    });
  }

}

@Component({
  selector: 'confirm-sprint-start-dialog',
  templateUrl: 'confirm-sprint-start-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmSprintStartDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmSprintStartDialog>) {}

  onTak(): void {
    this.dialogRef.close(true);
  }

  onAnuluj(): void {
    this.dialogRef.close(false);
  }

}

@Component({
  selector: 'confirm-sprint-end-dialog',
  templateUrl: 'confirm-sprint-end-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmSprintEndDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmSprintEndDialog>) {}

  onTak(): void {
    this.dialogRef.close(true);
  }

  onAnuluj(): void {
    this.dialogRef.close(false);
  }

}
