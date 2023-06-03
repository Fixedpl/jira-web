import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spring-list',
  templateUrl: './spring-list.component.html',
  styleUrls: ['./spring-list.component.scss']
})
export class SpringListComponent {

  @Input() items: string[] = [
    'Sprint 1',
    'Sprint 2',
    'Sprint 3',
    'Sprint 4'
  ];
  @Output() itemClicked: EventEmitter<string> = new EventEmitter<string>();

  onItemClick(item: string) {
    this.itemClicked.emit(item);
  }

}
