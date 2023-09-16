import { Component } from '@angular/core';
import { DataProviderService, TableType } from '../data-provider.service';
import { AbstractControl, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent {
  
  data :TableType= {
    id:'',
    name:{
      firstName:'',lastName:''
    },
    gender:'',
    dateOfBirth:'',
    email:'',
    phoneNumber:0,
    password:''
  };

   emailregex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

  params = this.currentPath.snapshot.paramMap;
  id:string = String(this.params.get('id'));

  idNumber :string=this.id;

  hidePassword: boolean = true;
  
  regForm = this.forms.group({
    id:[this.idNumber],
    name:this.forms.group({ firstName: ['' ,Validators.compose([Validators.required, Validators.maxLength(32)])],  lastName: ['', Validators.compose([Validators.required, Validators.maxLength(32)])]  }),
    gender: ['', Validators.required],
    dateOfBirth: ['' ,Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.pattern(this.emailregex)])],
    phoneNumber: [0, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)/*, Validators.pattern(this.numberregex)*/])],
    password: ['' ,Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])]
  });

  constructor ( private dataProvider : DataProviderService, private forms:FormBuilder,private route:Router ,private currentPath: ActivatedRoute) {   

    const params = this.currentPath.snapshot.paramMap;
    const id:string = String(params.get('id'));

    this.dataProvider.getUserById(id).subscribe((result)=> {
      this.data.id = result.id;
      this.data.name.firstName = result.name.firstName;
      this.data.name.lastName = result.name.lastName;
      this.data.gender = result.gender;
      this.data.dateOfBirth = result.dateOfBirth;
      this.data.email = result.email;
      this.data.phoneNumber= Number(result.phoneNumber);
      this.data.password = result.password;

      this.regForm.patchValue({
        id: this.data.id,
        name:{ 
          firstName: this.data.name.firstName,  lastName: this.data.name.lastName},
        gender: this.data.gender,
        dateOfBirth: this.dataProvider.dateFormat(this.data.dateOfBirth,'yyyy-MM-dd'),
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        password: this.data.password
      })
    });
   }

  Onprocess() {
    let vaa = JSON.parse(JSON.stringify(this.regForm.value));
    this.dataProvider.updateById(this.id,vaa).subscribe((result)=>{ console.log(result , "view update")});
    this.regForm.reset();
    this.route.navigate(['/DashBoard']);
  }

  GotoBack() {
    this.regForm.reset();
    this.route.navigate([".."],{relativeTo: this.currentPath});
  }
   
  getcontrol(name: any): AbstractControl | null {
    return this.regForm.get(name)
  } 
}
