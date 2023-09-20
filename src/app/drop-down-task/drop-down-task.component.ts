import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-drop-down-task',
  templateUrl: './drop-down-task.component.html',
  styleUrls: ['./drop-down-task.component.css']
})
export class DropDownTaskComponent {

  WholeState() :{code: string, desc:string, cn:string}[] { 
    return [
    {code: 'SG', desc: 'Singapore',cn:'SG'},
    {code: 'TN', desc: 'Tamil Nadu',cn:'IN'},
    {code: 'AP', desc: 'Andhra Pradesh',cn:'IN'},
    {code: 'KUL', desc: 'W.P. Kuala Lumpur',cn:'MY'},
    {code: 'SL', desc: 'Sri Lanka',cn:'LK'},
  ]};

  WholeCities() : {code:string,desc:string,cn:string,st:string}[] {    
    return [
    {code: 'CSG', desc: 'Central Singapore',cn:'SG',st:'singapore'},
    {code: 'CHN', desc: 'Chennai',cn:'IN',st: 'TN'},
    {code: 'VZ', desc: 'Visakhapatnam',cn:'IN',st:'AP'},
    {code: 'CH', desc: 'Cheras',cn:'MY',st:'KUL'},
    {code: 'CL', desc: 'Colombo',cn:'LK',st:'SL'},
  ]};

  Countries: {code: string, desc: string}[] =[
    {code: 'IN', desc: 'India'},
    {code: 'SG', desc: 'Singapore'},
    {code: 'MY', desc: 'Malaysia'},
    {code: 'LK', desc: 'Sri Lanka'}
  ];

  states : {code: string, desc:string, cn:string}[]= [{code:'',desc: '', cn: ''}];

  Cities: {code:string,desc:string,cn:string,st:string}[] =[{code:'',desc:'',cn:'',st:''}];

  changeStates(ev: MatSelectChange){    
    console.log((ev as unknown as string));
    this.states = this.WholeState().filter(val=> val.cn == (ev as unknown as string) );
    console.log(this.states);
  }

    
  changeCities(ev: MatSelectChange){
    console.log((ev as unknown as string));
    this.Cities = this.WholeCities().filter(val=> val.st == (ev as unknown as string));
    console.log(this.Cities);
    
  }

}
