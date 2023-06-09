import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent {

  constructor(private router: Router, private http: HttpClient){}

  @Input() title: string;
  @Input() items: Project[];
  selectedItem: String;
  projectItems: Project[];
  projectService : ProjectService;

  ngOnInit() {
    this.checkUserProjects();
  }

  checkUserProjects(): void {
    //this.projectItems = this.projectService.checkUserProjects();
    this.http.get<Project[]>('/api/v1/project/usersProject').subscribe(
      (response: Project[]) => {
        this.projectItems = response;
      },
      (error: any) => {
        console.error('Błąd podczas pobierania projektów użytkownika:', error);
      }
    );
  }

  selectItem(item: Project): void {
    //this.selectedItem = item.name;
    this.router.navigate(['/dashboard/project/' + item.id])
  }
 
  goToCreationProject() {
    this.router.navigate(['/dashboard/create-project']);
  }
}
