import { Component, Input, OnInit } from '@angular/core';
import { CardProject } from 'src/app/models/card-project';
import { Route, Router } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss']
})

export class CardProjectComponent implements OnInit{
 
  @Input() project: CardProject;
  constructor( private router: Router){};

  ngOnInit(): void {
    this.project.progresTask = this.calculateProgress();
  }
  calculateProgress(): number {
    return (this.project.completedTasks / this.project.totalTasks) * 100;
  }
  redirectToProject() {
    this.router.navigate(['/dashboard/project/' + this.project.id]);
  }
}