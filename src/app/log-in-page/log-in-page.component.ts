import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

export type loginType = {
  UserName: string;
  Password: string;
}

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LogInPageComponent {
  
  LoginData: loginType ={
    UserName:'',
    Password:''
  };

  hidePassword: boolean = true;

  canSubmit: boolean= true;  

  onSubmit(event: Event){
    event.preventDefault();

    this.way.navigate(['DashBoard']);
  }

  GotoRegister(){
    this.way.navigate(['Register']);
  }

  constructor(private way: Router) { }

}
