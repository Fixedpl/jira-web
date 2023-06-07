import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent {

  constructor(private router: Router){}

  @Input() title: string;
  @Input() items: string[];
  selectedItem: string;

  selectItem(item: string): void {
    this.selectedItem = item;
  }
  goToCreationProject() {
    this.router.navigate(['/dashboard/create-project']);
  }
}
