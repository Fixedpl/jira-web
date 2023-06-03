import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;
  
  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  nameOfProject: string;

  constructor(private http: HttpClient){
     
  }
  ngOnInit(): void {
    this.getNavDate();
  }
  getNavDate(){
    this.http.get('/api/v1/home/getProjectName',{responseType: "text"}).subscribe(
      (data)=> {
        console.log(data)
        this.nameOfProject = data;
      },
      (error)=>{
        console.error("Wystapił bład podczas wywoływania endpointu")
        console.log(error)
      }
      );
      
    
  }

}
