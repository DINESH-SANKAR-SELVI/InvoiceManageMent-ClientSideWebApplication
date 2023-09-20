import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterPageComponent } from '../register-page/register-page.component';

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

  emailregex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

  hidePassword: boolean = true;

  canSubmit: boolean= true;  

  onSubmit(event: Event){
    event.preventDefault();

    if(this.LoginData.UserName=='root@gmail.com'&& this.LoginData.Password=='12345678'){
        this.way.navigate(['DashBoard']);
    }
  }

  GotoRegister(){
    this.way.navigate(['Register']);
  }

  constructor(private way: Router, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterPageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}