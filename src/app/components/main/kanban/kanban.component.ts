import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { State } from 'src/app/models/enums/state';
import { Priority } from 'src/app/models/enums/priority';
import { TooltipPosition } from '@angular/material/tooltip';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  sprintId: number;


  //['LOW','MEDIUM', 'HIGH', 'CRITICAL'];
  priorityPositionOptions: string[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL];
  priorityPosition = new FormControl(this.priorityPositionOptions[0]);

  userPositionOptions: User[] = [];
  userPosition = new FormControl(this.userPositionOptions[0]);

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private userService: UserService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getSprintId();
    this.todoForm = this.fb.group({
      title: ['', Validators.required], // Dodaj to pole do formularza
      description: ['', Validators.required], // Dodaj to pole do formularza
      priority: ['', Validators.required] ,
      user: ['', Validators.required]
    });
    this.initializeColumns();
    this.getProjectMembersBySprintId();
    this.getTasksFromSprint();
  }

  getSprintId(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const stringSprintId: string | null = paramMap.get("sprintId");
      if (stringSprintId === null) {
        //this.snackBar.open("Błąd: Nie przekazano w ścieżce widoku task id");
        return;
      }
      this.sprintId = parseInt(stringSprintId);
    })
  }

  addTask() {
    // this.columns[0].tasks.push({
    //   description: this.todoForm.value.item,
    //   state: State.DONE,
    //   id: 0,
    //   title: '',
    //   reporterId: 0,
    //   assignedId: 0,
    //   estimatedTime: new Date(),
    //   priority: Priority.LOW,
    //   sprints: []
    // });
    let newTask: Task = new Task();
    console.log(this.todoForm.value.title);
    newTask.title = this.todoForm.value.title;
    newTask.description = this.todoForm.value.description;
    newTask.priority = this.todoForm.value.priority;
    newTask.state = State.TO_DO;
    newTask.assignedId = this.todoForm.value.user.id;
    newTask.sprintId = this.sprintId;

    this.taskService.addTask(newTask).subscribe({
      complete: () => {
        this.snackBar.open('Pomyślnie dodano task');
        window.location.reload();
        //this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Nie udało się dodać taska');
        console.log(err);
      }
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
    const tasks: Task[] = this.columns[0].tasks
    const taskToDelete = tasks[i];
    this.taskService.deleteTaskById(taskToDelete.id).toPromise()
    .then(() => {
      // Przekierowanie na inną stronę po udanym usunięciu
      console.log('Spotkanie zostało usunięte.');
      window.location.reload();
    })
    .catch((error) => {
      // Obsługa błędu
      console.error('Wystąpił błąd podczas usuwania spotkania:', error);
      this.snackBar.open('Wystąpił błąd podczas usuwania spotkania.', 'Zamknij');
    });
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

  getProjectMembersBySprintId(): void {
      this.activatedRoute.paramMap.subscribe(paramMap => {
      const stringSprintId: string | null = paramMap.get("sprintId");
      if (stringSprintId === null) {
        //this.snackBar.open("Błąd: Nie przekazano w ścieżce widoku task id");
        return;
      }
      const sprintId: number = parseInt(stringSprintId);
      this.userService.getProjectMembersBySprintId(sprintId).subscribe(res => {
        console.log(res);
        this.userPositionOptions = res;
      });
    })
  }

  getTasksFromSprint(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const stringSprintId: string | null = paramMap.get("sprintId");
      if (stringSprintId === null) {
        //this.snackBar.open("Błąd: Nie przekazano w ścieżce widoku task id");
        return;
      }
      const sprintId: number = parseInt(stringSprintId);
      this.taskService.getTasksBySprintId(sprintId).subscribe(res => {
        console.log("COLUMNSS " + res)
      // Wyczyść zadania w kolumnach
      this.columns.forEach(column => {
        column.tasks = [];
      });
      // Przypisz zadania z 'res' do odpowiednich kolumn na podstawie stanu (state)
      res.forEach(task => {
        const column = this.columns.find(column => column.state === task.state);
        if (column) {
          column.tasks.push(task);
        }
      });
      });
    })
  }

  goTotask(taskId: number) {
    this.router.navigate(['/dashboard/task/' + taskId]);
  }
}
