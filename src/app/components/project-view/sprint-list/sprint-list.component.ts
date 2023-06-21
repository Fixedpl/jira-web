import {Component, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from "../../../services/sprint.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnChanges{

  @Input() projectId: number | null = null;

  activeSprint: Sprint | undefined = undefined;
  plannedSprints: Sprint[] = [];
  finishedSprints: Sprint[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sprintService: SprintService,
    private snackBar: MatSnackBar
    ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadSprints(this.projectId);
  }

  onSprintStart(sprint: Sprint): void {
    this.sprintService.startSprint(sprint.id).subscribe({
      complete: () => {
        this.snackBar.open('Wystartowano sprint');
        this.loadSprints(this.projectId);
      },
      error: err => {
        this.snackBar.open('Nie udało się wystartować sprintu');
        console.log(err);
      }
    });
  }

  onSprintEnd(sprint: Sprint): void {
    this.sprintService.endSprint(sprint.id).subscribe({
      complete: () => {
        this.snackBar.open('Zakończono sprint');
        this.loadSprints(this.projectId);
      },
      error: err => {
        this.snackBar.open('Nie udało się zakończyć sprintu');
        console.log(err);
      }
    });
  }

  loadSprints(projectId: number | null): void {
    if(!projectId) {
      return;
    }
      this.sprintService.getSprints(projectId).subscribe(sprints => {
      this.activeSprint = sprints.find(sprint => sprint.active);
      this.plannedSprints = sprints.filter(sprint => sprint.actualEndDate === null && !sprint.active);
      this.finishedSprints = sprints.filter(sprint => sprint.actualEndDate !== null && !sprint.active);
    });
  }

  onSprintPressed(sprint: Sprint): void {
    this.router.navigate(['dashboard/sprint/' + sprint.id]);
  }

  openAddSprintDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddSprintDialog, {
      data: this.projectId,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(sprintAdded => {
      if(sprintAdded) {
        this.loadSprints(this.projectId);
      }
    });
  }

}

@Component({
  selector: 'add-sprint-dialog',
  templateUrl: 'add-sprint-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
})
export class AddSprintDialog {

  title: string = "";
  startDate: Date;
  endDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectId: number,
    private sprintService: SprintService,
    public dialogRef: MatDialogRef<AddSprintDialog>,
    private snackBar: MatSnackBar
  ) {}

  onDodaj(): void {
    let newSprint: Sprint = new Sprint();
    newSprint.title = this.title;
    newSprint.startDate = this.startDate;
    newSprint.endDate = this.endDate;
    newSprint.projectId = this.projectId;

    this.sprintService.addSprint(newSprint).subscribe({
      complete: () => {
        this.snackBar.open('Pomyślnie dodano sprint');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Nie udało się dodać sprintu');
        console.log(err);
      }
    });
  }

  onAnuluj(): void {
    this.dialogRef.close(null);
  }

}
