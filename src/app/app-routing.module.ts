import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProjectCreationViewComponent } from './components/main/project-creation-view/project-creation-view.component';
import { ProjectlistComponent } from './components/main/projectlist/projectlist.component';
import { MainComponent } from './components/main/main.component';
import { AccountViewComponent } from './components/main/account-view/account-view.component';



const routes: Routes = [
	{ path: '', component: LoginComponent },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', component: ProjectlistComponent },
    { path: 'project/:id', component: ProjectViewComponent },
    { path: 'create-project', component: ProjectCreationViewComponent, canActivate: [AuthGuard]},
    { path: 'account-view', component: AccountViewComponent, canActivate: [AuthGuard]}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
