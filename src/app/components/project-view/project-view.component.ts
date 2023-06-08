import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Sprint } from 'src/app/models/sprint';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';

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

  projectName: string = "";
  projectDescription: string = "";

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
    ) { }

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
        this.projectName = project.name;
        this.projectDescription = project.description;

        this.loadSprints(this.project.id);
      });
    })
  }

  onSprintStart(sprint: Sprint): void {
    this.sprintService.startSprint(sprint.id).subscribe(hasStarted => {
      if(hasStarted) {
        this.loadSprints(this.project.id);
      }
    });
  }

  onSprintEnd(sprint: Sprint): void {
    this.sprintService.endSprint(sprint.id).subscribe(hasFinished => {
      if(hasFinished) {
        this.loadSprints(this.project.id);
      }
    });
  }

  loadSprints(projectId: number): void {
    this.sprintService.getSprints(projectId).subscribe(sprints => {
      this.activeSprint = sprints.find(sprint => sprint.active);
      this.plannedSprints = sprints.filter(sprint => sprint.actualEndDate === null && !sprint.active);
      this.finishedSprints = sprints.filter(sprint => sprint.actualEndDate !== null && !sprint.active);
    });
  }

}
