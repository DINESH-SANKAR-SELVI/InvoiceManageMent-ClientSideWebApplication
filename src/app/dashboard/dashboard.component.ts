import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  auth:boolean =true;

  constructor(private route: Router,private currentPath: ActivatedRoute) { }

  ViewTable(){
    // alert('viewTable');
    this.route.navigate(['TableInfo'],{relativeTo: this.currentPath});
  }

  ViewEmployee(){
    // alert('view employee');
    this.route.navigate(['ViewEmployee'],{relativeTo: this.currentPath});
  }
}
