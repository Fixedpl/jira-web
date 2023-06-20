import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/models/enums/state';
import { Priority } from 'src/app/models/enums/priority';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  todoForm!: FormGroup;
  columns: { state: State; tasks: Task[] }[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
    this.initializeColumns();
  }

  addTask() {
    this.columns[0].tasks.push({
      description: this.todoForm.value.item,
      state: State.DONE,
      id: 0,
      title: '',
      reporterId: 0,
      assignedId: 0,
      estimatedTime: new Date(),
      priority: Priority.LOW,
      sprints: []
    });
    this.todoForm.reset();
  }

  onEdit(item: Task, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask() {
    this.columns[0].tasks[this.updateIndex].description = this.todoForm.value.item;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number) {
    this.columns[0].tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.columns[1].tasks.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.columns[this.columns.length - 1].tasks.splice(i, 1);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  initializeColumns() {
    const states = Object.values(State);
    this.columns = states.map(state => ({ state: state, tasks: [] }));
  }
}
