import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from "../../../services/sprint.service";


@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent {
  @Input() activeSprint: Sprint | undefined;
  @Input() plannedSprints: Sprint[];
  @Input() finishedSprints: Sprint[];

  @Output() sprintStarted: EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() sprintFinished: EventEmitter<Sprint> = new EventEmitter<Sprint>();

  constructor(
    private router: Router
    ) {}

  onSprintPressed(sprint: Sprint): void {
    this.router.navigate(['dashboard/sprint/' + sprint.id]);
  }

  onSprintStart(sprint: Sprint): void {
    this.sprintStarted.emit(sprint);
  }

  onSprintEnd(sprint: Sprint): void {
    this.sprintFinished.emit(sprint);
  }

}
