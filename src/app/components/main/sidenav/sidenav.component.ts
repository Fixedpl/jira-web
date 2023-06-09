import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavHidden: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient){}

  ngOnInit(): void {

  }

}
