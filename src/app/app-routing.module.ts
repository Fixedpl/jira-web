import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProjectCreationViewComponent } from './components/main/project-creation-view/project-creation-view.component';
import { ProjectlistComponent } from './components/main/projectlist/projectlist.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
	{ path: '', component: LoginComponent },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: 'project-list', component: ProjectlistComponent },
    { path: 'project', component: ProjectViewComponent },
    { path: 'create-project', component: ProjectCreationViewComponent, canActivate: [AuthGuard]}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
