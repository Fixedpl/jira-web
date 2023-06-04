import { Component } from '@angular/core';

@Component({
  selector: 'app-project-creation-view',
  templateUrl: './project-creation-view.component.html',
  styleUrls: ['./project-creation-view.component.scss']
})
export class ProjectCreationViewComponent {
  projectName: string;
  projectDescription: string;

  onSubmit() {
    // Tutaj możesz wykonać odpowiednie działania, np. utworzyć nowy projekt na podstawie wprowadzonych danych.
    // projectName i projectDescription będą dostępne w tym miejscu, abyś mógł z nimi pracować.
    console.log('Utworzono nowy projekt:', this.projectName, this.projectDescription);
  }
  
}
