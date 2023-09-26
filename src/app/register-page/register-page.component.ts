import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProviderService } from '../data-provider.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RegisterPageComponent {
  constructor(
    private forms: FormBuilder,
    private route: Router,
    private dataProvider: DataProviderService,
    public load: LoaderService
  ) {}

  idNumber: string = this.generateRandomId();

  //numberregex:string ="^(?:\+91|0)[-\s]?\d{4}[-\s]?\d{6}$";
  emailregex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';

  regForm = this.forms.group({
    id: [this.idNumber],
    name: this.forms.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)]),
      ],
    }),
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.compose([Validators.required])],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.emailregex),
      ]),
    ],
    phoneNumber: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10) /*, Validators.pattern(this.numberregex)*/,
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]),
    ],
  });

  generateRandomId(): string {
    const min = 100000;
    const max = 999999;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId.toString();
  }

  value = 'clear me';

  hidePassword: boolean = true;

  Onprocess() {
    console.log(this.regForm.value);

    this.dataProvider
      .postData(JSON.parse(JSON.stringify(this.regForm.value)))
      .subscribe((result) => {
        console.log(result, 'in register');
      });
    this.route.navigate(['/DashBoard']);
  }

  GotoLogIn() {
    this.route.navigate(['/LogIn']);
  }

  getcontrol(name: any): AbstractControl | null {
    return this.regForm.get(name);
  }
}
