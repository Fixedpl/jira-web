import { Component } from '@angular/core';
import { ProjectCreationViewComponent } from './project-creation-view/project-creation-view.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  current: string = 'default';
}
