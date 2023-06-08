import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from "../../../services/sprint.service";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";


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
    private sprintService: SprintService
    ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadSprints(this.projectId);
  }

  onSprintStart(sprint: Sprint): void {
    this.sprintService.startSprint(sprint.id).subscribe(hasStarted => {
      if(hasStarted) {
        this.loadSprints(this.projectId);
      }
    });
  }

  onSprintEnd(sprint: Sprint): void {
    this.sprintService.endSprint(sprint.id).subscribe(hasFinished => {
      if(hasFinished) {
        this.loadSprints(this.projectId);
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

  onAddSprint(): void {

  }

  openAddSprintDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddSprintDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(sprint => {
      this.sprintService.addSprint(sprint);
    });
  }

}

@Component({
  selector: 'add-sprint-dialog',
  templateUrl: 'add-sprint-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
})
export class AddSprintDialog {

  title: string = "";
  startDate: Date;

  constructor(public dialogRef: MatDialogRef<AddSprintDialog>) {}

  onDodaj(): void {
    console.log(this.title);
    this.dialogRef.close(true);
  }

  onAnuluj(): void {
    this.dialogRef.close(null);
  }

}
