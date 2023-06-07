import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project-creation-view',
  templateUrl: './project-creation-view.component.html',
  styleUrls: ['./project-creation-view.component.scss']
})
export class ProjectCreationViewComponent {

  newProject: Project;
  projectName: string;
  projectDescription: string;
  startDate: Date;
  endDate: Date;
  constructor(private projectService: ProjectService, private router: Router, private http: HttpClient) {
    this.startDate = new Date();
    this.endDate = new Date();
    this.newProject = new Project();
  }
  onSubmit() {
    // Tutaj możesz wykonać odpowiednie działania, np. utworzyć nowy projekt na podstawie wprowadzonych danych.
    // projectName i projectDescription będą dostępne w tym miejscu, abyś mógł z nimi pracować.
    console.log('Utworzono nowy projekt:', this.projectName, this.projectDescription);
  }
  creatProject() {
    this.newProject.id = Number(1);
    this.newProject.name = this.projectName;
    this.newProject.description = this.projectDescription;
    this.newProject.startDate = this.startDate.toISOString();
    this.newProject.endDate = this.endDate.toISOString();
    this.projectService.createProject(this.newProject).subscribe(
      e => this.router.navigate(['/dashboard'])
    );
  }
  
}
