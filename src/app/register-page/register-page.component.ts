import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterPageComponent {

  constructor(private forms: FormBuilder,private route:Router) { }

  regForm = this.forms.group({
    name:this.forms.group({ firstName: [''],  lastName: ['']  }),
    gender: [''],
    dateOfBirth: [''],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    password: [''],
});

  value='clear me';
  
  Onprocess() {
    console.log(this.regForm.value)
    alert(this.regForm.get('name')?.get('firstName')?.value);

    this.route.navigate(['/DashBoard']);
  }

  GotoLogIn() {
    this.route.navigate(['/LogIn']);
  }

}




