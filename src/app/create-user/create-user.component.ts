import { LoaderService } from './../loader.service';
import { Component } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { DataProviderService, TableType } from '../data-provider.service';
import { FormBuilder } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  data: TableType = {
    id: '',
    name: {
      firstName: '',
      lastName: '',
    },
    gender: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: 0,
    password: '',
  };

  emailregex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';

  params = this.currentPath.snapshot.paramMap;
  id: string = String(this.params.get('id'));

  idNumber: string = this.id;

  hidePassword: boolean = true;

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
      0,
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

  constructor(
    private dataProvider: DataProviderService,
    private forms: FormBuilder,
    private route: Router,
    private currentPath: ActivatedRoute,
    public load: LoaderService
  ) {}

  Onprocess() {
    let vaa = JSON.parse(JSON.stringify(this.regForm.value));
    this.dataProvider.postData(vaa).subscribe((result) => {
      console.log(result, 'create user');
    });
    this.regForm.reset();
    this.route.navigate(['DashBoard']);
  }

  GotoBack(event: any) {
    event.preventDefault();
    this.regForm.reset();
  }

  getcontrol(name: any): AbstractControl | null {
    return this.regForm.get(name);
  }
}
