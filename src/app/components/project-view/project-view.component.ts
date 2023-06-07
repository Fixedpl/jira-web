import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Sprint } from 'src/app/models/sprint';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  project: Project;
  activeSprint: Sprint | undefined;
  plannedSprints: Sprint[];
  finishedSprints: Sprint[];

  constructor(private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const projectIdString: string | null = paramMap.get("id");
      if (projectIdString === null) {
        this.snackBar.open("Błąd: Nie przekazano w ścieżce widoku projektu id");
        return;
      }
      const projectId: number = parseInt(projectIdString);
      this.projectService.getById(projectId).subscribe(project => {
        this.project = project;
        this.projectService.getSprints(this.project.id).subscribe(sprints => {
          console.log(sprints);
          this.activeSprint = sprints.find(sprint => sprint.active === true);
          this.plannedSprints = sprints.filter(sprint => sprint.actualEndDate === null && sprint.active === false);
          this.finishedSprints = sprints.filter(sprint => sprint.actualEndDate !== null && sprint.active === false);
        })
      });
    })
  }

}
