import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './components/profile/profile.service';
import { AvatarComponent } from './components/profile/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent
    MainComponent,
    ProfileComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService , AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
