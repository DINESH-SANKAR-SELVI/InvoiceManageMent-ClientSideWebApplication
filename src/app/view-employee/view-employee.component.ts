import { Component } from '@angular/core';
import { DataProviderService, TableType } from '../data-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  data: TableType[] |undefined; 

  constructor (private dataProvider: DataProviderService,private route: Router, private currentURL: ActivatedRoute ) { 
    this.dataProvider.getAllUser().subscribe( (result)=>{ this.data=result; })
  }

  MakeEdit(ar:any){
    this.route.navigate([ar],{relativeTo: this.currentURL});
  }
  addUser(){
    let id = this.generateRandomId();
    this.route.navigate(['createData/'+id],{relativeTo: this.currentURL});
  }
  
  generateRandomId(): string {
    const min = 100000; 
    const max = 999999; 
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomId.toString();
  }
}
