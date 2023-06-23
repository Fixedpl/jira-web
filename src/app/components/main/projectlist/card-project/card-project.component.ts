import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardProject } from 'src/app/models/card-project';
import { Route, Router } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss']
})

export class CardProjectComponent implements OnInit, OnChanges {
 
  @Input() project: CardProject;
  constructor( private router: Router){}ngOnChanges(changes: SimpleChanges): void {
    this.project.progresTask = this.calculateProgress();
    console.log(this.project.completedTasks);
  }
;

  ngOnInit(): void {
    //this.project.progresTask = this.calculateProgress();
    //console.log(this.project.completedTasks);
  }

  
  calculateProgress(): number {
    return (this.project.completedTasks / this.project.totalTasks) * 100;
  }
  redirectToProject() {
    this.router.navigate(['/dashboard/project/' + this.project.id]);
  }
}