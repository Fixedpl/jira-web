import { Component, OnInit } from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { TaskService } from 'src/app/services/task.service';
import { UserView } from 'src/app/models/user-view';

import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Priority } from 'src/app/models/enums/priority';
import { State } from 'src/app/models/enums/state';
import { Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [DatePipe]
})
export class TaskComponent implements OnInit {
  @Input() task: Task = new Task();
  commentsTask: TaskComment[] = [];
  users: UserView[] = [];
  
  commentStatusText: string;
  commentStatusClass: string;

  reporter: UserView;
  assigned: UserView;
  

  constructor(private taskService: TaskService,
              private commentService: CommentService,
              private userService: UserService,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const stringTaskId: string | null = paramMap.get("id");
      if (stringTaskId === null) {
        this.snackBar.open("Błąd: Nie przekazano w ścieżce widoku task id");
        return;
      }
      const taskId: number = parseInt(stringTaskId);
      this.taskService.getTaskById(taskId).subscribe((task: Task) => {
        this.task = task;
        this.userService.getById(task.reporterId).subscribe((user: UserView) => {
          this.reporter = user;
        });
        this.userService.getById(task.assignedId).subscribe((user: UserView) => {
          this.assigned = user;
        });
      });

      this.commentService.getCommentsByTaskId(taskId)
      .subscribe((komentarze: TaskComment[]) => {
          this.commentsTask = komentarze;;
      });
    })
  }

  getUserById(userId: number): UserView | undefined {
    return this.users.find((user) => user.id === userId);
  }

  isDateEqual(date1: string, date2: string): boolean {
    return date1 === date2;
  }

  addComment() {
    const comment = document.getElementById('commentInput') as HTMLTextAreaElement;

    let newComment: TaskComment = new TaskComment();
    newComment.content = comment.value;
    newComment.taskId = this.task.id;

    this.commentService.createComment(newComment, this.task.id).subscribe(
      e => {
        this.router.navigate(['/dashboard/task/' + this.task.id])
        .then(() => {
          window.location.reload();
        });
      }
    );
  }

  openEditSprintComponent(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditTaskDialog, {
      data: this.task.id,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(taskAdded => {
      if(taskAdded) {
        //this.loadSprints(this.task.id);
      }
    });
  }
}











@Component({
  selector: 'edit-task-dialog',
  templateUrl: 'edit-task-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatSelectModule, CommonModule],
})
export class EditTaskDialog {

  title: string = "";
  description: string = "";
  priority: Priority;
  state: State;
  estimatedTime: Date;

  stateOptions: State[] = Object.values(State);
  priorityOptions: Priority[] = Object.values(Priority);
  
  statePosition = new FormControl(this.stateOptions[0]);
  priorityPosition = new FormControl(this.priorityOptions[0]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public taskId: number,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<EditTaskDialog>,
    private snackBar: MatSnackBar
  ) {}

  onDodaj(): void {
    let newTask: Task = new Task();
    newTask.title = this.title;
    newTask.description = this.description;
    newTask.priority = this.priority;
    newTask.state = this.state;
    newTask.id = this.taskId;

    console.log(this.taskId);
    this.taskService.addTask(newTask).subscribe({
      complete: () => {
        this.snackBar.open('Pomyślnie dodano task');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Nie udało się dodać taska');
        console.log(err);
      }
    });
  }

  onAnuluj(): void {
    console.log(this.stateOptions);
    this.dialogRef.close(null);
  }

}
