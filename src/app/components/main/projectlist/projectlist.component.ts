import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';
import { CardProject } from 'src/app/models/card-project';
import { Project } from 'src/app/models/project';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/sprint';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit{

  
  constructor(private router: Router, private http: HttpClient, private projectService: ProjectService, private sprintService: SprintService){
  }

  @Input() title: string;
  projects: Project[];
  projectCards: CardProject[] = [];
  sprint: Sprint;
    

  ngOnInit() {
    this.checkUserProjects();
    
  }

  checkUserProjects(): void {
    this.projectService.getProjects().subscribe(res => {
      this.projects = res;
      this.projectCards = [];

      const projectObservables = this.projects.map(project => {
        const cardProject = new CardProject();
        cardProject.name = project.name;
        cardProject.id = project.id;
        return forkJoin([
          this.sprintService.getCompletedTasks(cardProject.id),
          this.sprintService.getTotalTasks(cardProject.id)
        ]).pipe(
          map(([completedTasks, totalTasks]) => {
            cardProject.completedTasks = completedTasks || 0;
            cardProject.totalTasks = totalTasks || 0;
            return cardProject;
          })
        );
      });

      forkJoin(projectObservables).subscribe(projectCards => {
        this.projectCards = projectCards;
      });
    });
  }

  goToCreationProject() {
    this.router.navigate(['/dashboard/create-project']);
  }
}

//   id: 1,
//   name: 'Nazwa Projektu 1',
//   completedTasks: 10,
//   totalTasks: 100,
//   progresTask: 0
// },
// {
//   id: 2,
//   name: 'Pacman sztywny',
//   completedTasks: 45,
//   totalTasks: 56,
//   progresTask: 0
// },
// {
//   id: 3,
//   name: 'Nazwa Projektu 3',
//   completedTasks: 36,
//   totalTasks: 76,
//   progresTask: 0
// },
// {
//   id: 4,
//   name: 'Nazwa Projektu 4',
//   completedTasks: 11,
//   totalTasks: 32,
//   progresTask: 0
// }