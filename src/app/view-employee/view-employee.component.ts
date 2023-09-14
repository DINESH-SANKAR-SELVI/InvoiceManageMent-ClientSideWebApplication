import { Component } from '@angular/core';
import { DataProviderService, TableType } from '../data-provider.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  data: TableType[] |undefined; 

  constructor (private dataProvider: DataProviderService) { 

    this.dataProvider.getAllUser().subscribe( (result)=>{ this.data=result; })
  }
  
  names :string[]=["dinesh","siva","sakthi","selvam","murugan"];

  MakeEdit(ar:any){
    alert("edited" +ar);

    console.warn(this.data?.values)
  }

}
