import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';
import { CardProject } from 'src/app/models/card-project';
import { Project } from 'src/app/models/project';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/sprint';

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
    this.projectService.getProjects().subscribe( res =>{
        this.projects = res;
        this.projectCards = [];
        for(let i=0; i<this.projects.length; i++){
          this.projectCards[i] = new CardProject();
          this.projectCards[i].name = this.projects[i].name;
          this.projectCards[i].id = this.projects[i].id;
          console.log(this.projectCards[i].name)
          this.sprintService.getCompletedTasks(this.projectCards[i].id).subscribe( res =>{
              if(res){
                this.projectCards[i].completedTasks = res;
              }else{
                this.projectCards[i].completedTasks = 0;
              }
          });
          this.sprintService.getTotalTasks(this.projectCards[i].id).subscribe( res =>{
            if(res){
              this.projectCards[i].totalTasks = res;
            }else{
              this.projectCards[i].totalTasks = 0;
            }
        });
        console.log("projects" + this.projectCards)
        }
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