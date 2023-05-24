import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { MainComponent } from './components/main/main.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
