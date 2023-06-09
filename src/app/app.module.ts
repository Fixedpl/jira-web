import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthService } from './auth/auth-service';
import { AuthGuard } from './auth/auth-guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ProjectMembersComponent } from './components/project-view/project-members/project-members.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProjectService } from './services/project.service';
import { SprintListComponent } from './components/project-view/sprint-list/sprint-list.component';
import { SprintItemComponent } from './components/project-view/sprint-list/sprint-item/sprint-item.component';
import { SidenavComponent } from './components/main/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProjectlistComponent } from './components/main/projectlist/projectlist.component';
import { ProjectCreationViewComponent } from './components/main/project-creation-view/project-creation-view.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { SprintService } from './services/sprint.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountViewComponent } from './components/main/account-view/account-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {NgOptimizedImage} from "@angular/common";
import { CardProjectComponent } from './components/main/projectlist/card-project/card-project.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploaderComponent } from './components/main/account-view/image-uploader/image-uploader.component';
import { TaskComponent } from './components/main/task/task.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './services/comment.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './components/main/kanban/kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ProjectMembersComponent,
    ProjectViewComponent,
    SprintListComponent,
    SprintItemComponent,
    SidenavComponent,
    ProjectlistComponent,
    ProjectCreationViewComponent,
    AccountViewComponent,
    CardProjectComponent,
    ImageUploaderComponent,
    TaskComponent,
    CommentComponent,
    KanbanComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatDialogModule,
        MatDividerModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        MatSelectModule,
        CommonModule,
        DragDropModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService ,
    AuthGuard,
    ProjectService,
    SprintService,
    CommentService
  ],
  bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
