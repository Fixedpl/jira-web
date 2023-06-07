import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent {
  @Input() title: string;
  @Input() items: string[];
  selectedItem: string;

  selectItem(item: string): void {
    this.selectedItem = item;
  }
}
