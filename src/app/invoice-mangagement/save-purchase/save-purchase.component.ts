import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from './../../loader.service';
import { TypeProviderService, PurchaseOrder } from './../type-provider.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceFormatComponent } from '../invoice-format/invoice-format.component';

@Component({
  selector: 'app-save-purchase',
  templateUrl: './save-purchase.component.html',
  styleUrls: ['./save-purchase.component.css']
})
export class SavePurchaseComponent implements OnInit {

  // value:PurchaseOrder = {
  //   Customer_Name: { First_Name:"DINESH",Last_Name:"SANKAR"},
  //   Customer_Address: { Country:"CHENNAI", State:"TAMILNADU", city: "CHENNAI"},
  //   Delivery_Date:"03/22/2023", 
  //   Purchase_Date:"02/31/2023", 
  //   Customer_Order_No: 76537836, 
  //   Invoice_Amount: 120000
  // };

  temArray :any = [];
  valueArray :Array<String | number>= [];
  z: any;
  a :any;
  b:any;
  c:any;
  d: any;
  e: any;

  id = this.generateRandomId();

  PurchaseDetail = this.form.group({
    id: [this.id],
    name:this.form.group({
      firstName: ['' ,Validators.compose([Validators.required, Validators.maxLength(32)])],
      lastName: ['' ,Validators.compose([Validators.required, Validators.maxLength(32)])]
    }),
    address: this.form.group({
      country: ['' ,Validators.compose([Validators.required])],
      state: ['' ,Validators.compose([Validators.required])],
      city: ['' ,Validators.compose([Validators.required])]
    }),
    deliveryDate: ['' ,Validators.compose([Validators.required])],
    purchaseDate: ['' ,Validators.compose([Validators.required])],
    customerOrderNo: ['' , Validators.required],
    invoiceAmount: ['' , Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(1)/*, Validators.pattern(this.numberregex)*/])]  
  });

  constructor( private TypeProvider: TypeProviderService, public load:LoaderService ,private form: FormBuilder,  public dialog: MatDialog) { }

  ngOnInit():void {
    // console.log(Object.values(this.value));// console.log(Object.entries(this.value)); // console.log(Object.keys(this.value));    
  }

  generateRandomId(): string {
    const min = 100000; 
    const max = 999999; 
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomId.toString();
  }

  getcontrol(name: any): AbstractControl | null {

    return this.PurchaseDetail.get(name)
  }
  

  FormConstractArray(){
    this.z = this.PurchaseDetail.get('name')?.value;
    // console.log(Object.values(this.z));
    this.a = this.PurchaseDetail.get('address')?.value;
    // console.log(Object.values(this.a));
    this.valueArray = this.temArray.concat(Object.values(this.z) as unknown as Array<string |number>).concat(Object.values(this.a) as unknown as Array<string |number>);
    this.b = String(this.PurchaseDetail.get('deliveryDate')?.value);
    this.b = (this.b as unknown as string).slice(4,15).replaceAll(" ","/");
    // console.log(this.b);
    this.valueArray.push(this.b);
    this.c = String(this.PurchaseDetail.get('purchaseDate')?.value);
    this.c = (this.c as unknown as string).slice(4,15).replaceAll(" ","/");
    // this.c = (this.c as unknown as string).replace(' ','/');
    // console.log(this.c);
    this.valueArray.push(this.c);
    this.d = this.PurchaseDetail.get('customerOrderNo')?.value;
    // console.log(this.d);
    this.valueArray.push(this.d);
    this.e = Number(this.PurchaseDetail.get('invoiceAmount')?.value);
    //console.log(this.e);
    this.valueArray.push(this.e);

  }
  onProcess(): void{
    this.FormConstractArray();
    console.log(this.valueArray);

    let vaa = JSON.parse(JSON.stringify(this.PurchaseDetail.value));
    this.TypeProvider.PostPurchase(vaa).subscribe((result)=>{console.log(result , "create user")});

    this.PurchaseDetail.reset();

    this.openDialog();
  }

  cancel(event:any): void{ event.preventDefault();

    this.PurchaseDetail.reset();
  }

  
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
    // console.log((ev as unknown as string));
    this.states = this.WholeState().filter(val=> val.cn == (ev as unknown as string) );
    // console.log(this.states);
  }
    
  changeCities(ev: MatSelectChange){
    // console.log((ev as unknown as string));
    this.Cities = this.WholeCities().filter(val=> val.st == (ev as unknown as string));
    // console.log(this.Cities);
  }
  
  
  openDialog() {
    const dialogRef = this.dialog.open(InvoiceFormatComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
