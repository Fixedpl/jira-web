import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';
import { CardProject } from 'src/app/models/card-project';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit{

  constructor(private router: Router, private http: HttpClient){
  }

  @Input() title: string;
  projectService : ProjectService;
  projects: CardProject[] = [
    {
      id: 1,
      name: 'Nazwa Projektu 1',
      completedTasks: 10,
      totalTasks: 100,
      progresTask: 0
    },
    {
      id: 2,
      name: 'Pacman sztywny',
      completedTasks: 45,
      totalTasks: 56,
      progresTask: 0
    },
    {
      id: 3,
      name: 'Nazwa Projektu 3',
      completedTasks: 36,
      totalTasks: 76,
      progresTask: 0
    },
    {
      id: 4,
      name: 'Nazwa Projektu 4',
      completedTasks: 11,
      totalTasks: 32,
      progresTask: 0
    }

  ];

  ngOnInit() {
    this.checkUserProjects();

  }

  checkUserProjects(): void {
    //this.projectItems = this.projectService.checkUserProjects();
  }

  goToCreationProject() {
    this.router.navigate(['/dashboard/create-project']);
  }
}
