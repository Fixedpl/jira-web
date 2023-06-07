import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';


@Component({
  selector: 'app-project-creation-view',
  templateUrl: './project-creation-view.component.html',
  styleUrls: ['./project-creation-view.component.scss']
})
export class ProjectCreationViewComponent {

  projectName: string;
  projectDescription: string;
  startDate: Date;
  endDate: Date;
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    this.startDate = new Date();
    this.endDate = new Date();
  }
  onSubmit() {
    // Tutaj możesz wykonać odpowiednie działania, np. utworzyć nowy projekt na podstawie wprowadzonych danych.
    // projectName i projectDescription będą dostępne w tym miejscu, abyś mógł z nimi pracować.
    console.log('Utworzono nowy projekt:', this.projectName, this.projectDescription);
  }
  creatProject() {
    this.authService.createProject(this.projectName, this.projectDescription, this.startDate.toISOString(), this.endDate.toISOString()).subscribe(
      e => this.router.navigate([''])
    );
  }
  
}
