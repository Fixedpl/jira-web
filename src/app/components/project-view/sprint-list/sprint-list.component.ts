import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent {
  @Input() activeSprint: Sprint | undefined;
  @Input() plannedSprints: Sprint[];
  @Input() finishedSprints: Sprint[];

  @Output() sprintClicked: EventEmitter<Sprint> = new EventEmitter<Sprint>();

  onItemClick(sprint: Sprint) {
    this.sprintClicked.emit(sprint);
  }
}
