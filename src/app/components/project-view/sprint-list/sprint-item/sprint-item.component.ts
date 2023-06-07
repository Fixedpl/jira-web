import { Component, Input } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-sprint-item',
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent {
  @Input() sprint: Sprint;
}
