import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoaderService } from './../../loader.service';
import { TypeProviderService, PurchaseOrder } from './../type-provider.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-save-purchase',
  templateUrl: './save-purchase.component.html',
  styleUrls: ['./save-purchase.component.css'],
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

  temArray: any = [];
  valueArray: Array<String | number> = [];
  z: any;
  a: any;
  b: any;
  c: any;
  d: any;
  e: any;

  id = this.generateRandomId();

  PurchaseDetail = this.fb.group({
    id: [this.id],
    name: this.fb.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(32)]),
      ],
    }),
    address: this.fb.group({
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
    }),
    deliveryDate: ['', Validators.compose([Validators.required])],
    purchaseDate: ['', Validators.compose([Validators.required])],
    customerOrderNo: ['', Validators.required],
    invoiceAmount: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1) /*, Validators.pattern(this.numberregex)*/,
      ]),
    ],
    aliases: this.fb.array([
      // this.fb.group(  {
      // id: this.generateRandomId(),
      // Sn: '1',
      // ItemName: 'apple',
      // Toqty: 1,
      // uom: 'KG',
      // price: 120,
      // amount: 120
      // })
    ]),
    ProductAttachment: this.fb.array([
      // this.fb.group(  {
      // id: this.generateRandomId(),
      // name: [''],
      // file: ['']
      // })
    ]),
  });

  constructor(
    private TypeProvider: TypeProviderService,
    public load: LoaderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // console.log(Object.values(this.value));// console.log(Object.entries(this.value)); // console.log(Object.keys(this.value));
  }

  generateRandomId(): string {
    const min = 100000;
    const max = 999999;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomId.toString();
  }

  getcontrol(name: any): AbstractControl | null {
    return this.PurchaseDetail.get(name);
  }

  FormConstractArray() {
    this.z = this.PurchaseDetail.get('name')?.value;
    // console.log(Object.values(this.z));
    this.a = this.PurchaseDetail.get('address')?.value;
    // console.log(Object.values(this.a));
    this.valueArray = this.temArray
      .concat(Object.values(this.z) as unknown as Array<string | number>)
      .concat(Object.values(this.a) as unknown as Array<string | number>);
    this.b = String(this.PurchaseDetail.get('deliveryDate')?.value);
    this.b = (this.b as unknown as string).slice(4, 15).replaceAll(' ', '/');
    // console.log(this.b);
    this.valueArray.push(this.b);
    this.c = String(this.PurchaseDetail.get('purchaseDate')?.value);
    this.c = (this.c as unknown as string).slice(4, 15).replaceAll(' ', '/');
    // this.c = (this.c as unknown as string).replace(' ','/');
    // console.log(this.c);
    this.valueArray.push(this.c);
    this.d = this.PurchaseDetail.get('customerOrderNo')?.value;
    // console.log(this.d);
    this.valueArray.push(this.d);
    this.e = String(this.PurchaseDetail.get('invoiceAmount')?.value);
    //console.log(this.e);
    this.valueArray.push(this.e);
  }
  onProcess(): void {
    this.FormConstractArray();
    console.log(this.valueArray);

    let vaa = JSON.parse(JSON.stringify(this.PurchaseDetail.value));
    this.TypeProvider.PostPurchase(vaa).subscribe((result) => {
      /*console.log(result , "create user")*/
    });

    this.showAndPostData();
    this.PurchaseDetail.reset();

    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('aliases')).length;
      i++
    ) {
      (<FormArray>this.PurchaseDetail.get('aliases')).removeAt(i);
    }

    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('ProductAttachment')).length;
      i++
    ) {
      (<FormArray>this.PurchaseDetail.get('ProductAttachment')).removeAt(i);
    }

    // setTimeout(() => {
    //   window.location.reload();
    // }, 9000);
  }

  cancel(event: any): void {
    event.preventDefault();

    this.PurchaseDetail.reset();
    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('aliases')).length;
      i++
    ) {
      (<FormArray>this.PurchaseDetail.get('aliases')).removeAt(i);
    }

    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('ProductAttachment')).length;
      i++
    ) {
      (<FormArray>this.PurchaseDetail.get('ProductAttachment')).removeAt(i);
    }
  }

  WholeState(): { code: string; desc: string; cn: string }[] {
    return [
      { code: 'SG', desc: 'Singapore', cn: 'SG' },
      { code: 'TN', desc: 'Tamil Nadu', cn: 'IN' },
      { code: 'AP', desc: 'Andhra Pradesh', cn: 'IN' },
      { code: 'KUL', desc: 'W.P. Kuala Lumpur', cn: 'MY' },
      { code: 'SL', desc: 'Sri Lanka', cn: 'LK' },
    ];
  }

  WholeCities(): { code: string; desc: string; cn: string; st: string }[] {
    return [
      { code: 'CSG', desc: 'Central Singapore', cn: 'SG', st: 'singapore' },
      { code: 'CHN', desc: 'Chennai', cn: 'IN', st: 'TN' },
      { code: 'VZ', desc: 'Visakhapatnam', cn: 'IN', st: 'AP' },
      { code: 'CH', desc: 'Cheras', cn: 'MY', st: 'KUL' },
      { code: 'CL', desc: 'Colombo', cn: 'LK', st: 'SL' },
    ];
  }

  Countries: { code: string; desc: string }[] = [
    { code: 'IN', desc: 'India' },
    { code: 'SG', desc: 'Singapore' },
    { code: 'MY', desc: 'Malaysia' },
    { code: 'LK', desc: 'Sri Lanka' },
  ];

  states: { code: string; desc: string; cn: string }[] = [
    { code: '', desc: '', cn: '' },
  ];
  Cities: { code: string; desc: string; cn: string; st: string }[] = [
    { code: '', desc: '', cn: '', st: '' },
  ];

  changeStates(ev: MatSelectChange) {
    // console.log((ev as unknown as string));
    this.states = this.WholeState().filter(
      (val) => val.cn == (ev as unknown as string)
    );
    // console.log(this.states);
  }

  changeCities(ev: MatSelectChange) {
    // console.log((ev as unknown as string));
    this.Cities = this.WholeCities().filter(
      (val) => val.st == (ev as unknown as string)
    );
    // console.log(this.Cities);
  }

  invoiceValue: any = [];

  showAndPostData() {
    console.log('posted and showed');
    this.invoiceValue = [];
    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('aliases')).length;
      i++
    ) {
      let temarr = Object.values(
        (<FormArray>this.PurchaseDetail.get('aliases')).at(i).value
      ) as unknown as Array<any>;
      this.invoiceValue.push(temarr);

      // let splitValue=((<FormArray>this.PurchaseDetail.get('aliases')).at(i).value);
      // let valueOfInvoice = JSON.parse(JSON.stringify(splitValue));
      // this.TypeProvider.postInvoice(valueOfInvoice).subscribe((result)=>{/*console.log(result, i , "Items added")*/});
    }
    console.warn(this.invoiceValue);
    // this.profileForm.reset();
  }

  amountChange(index: any) {
    let quantity = (<FormArray>this.PurchaseDetail.controls['aliases'])
      .at(index)
      ?.get('Toqty')?.value;
    let price = (<FormArray>this.PurchaseDetail.controls['aliases'])
      .at(index)
      ?.get('price')?.value;
    let amountOfFinal = Number(Number(quantity) * Number(price));

    (<FormArray>this.PurchaseDetail.controls['aliases'])
      .at(index)
      ?.get('amount')
      ?.setValue(amountOfFinal);

    console.log(
      'index',
      index,
      'price',
      price,
      'quantity',
      quantity,
      'amount',
      amountOfFinal
    );

    this.invoiceAmountCalc();
  }
  get aliases() {
    return this.PurchaseDetail.get('aliases') as FormArray;
  }
  get ProductAttachment() {
    return this.PurchaseDetail.get('ProductAttachment') as FormArray;
  }

  addAlias() {
    this.aliases.push(
      this.fb.group({
        id: this.generateRandomId(),
        Sn: '1',
        ItemName: 'apple',
        Toqty: 1,
        uom: 'KG',
        price: 120,
        amount: 120,
      })
    );
    this.invoiceAmountCalc();
  }

  addAttachment() {
    this.ProductAttachment.push(
      this.fb.group({
        id: this.generateRandomId(),
        name: [''],
        file: [''],
      })
    );
  }

  invoiceAmountCalc() {
    let calcInvoice: number = 0;

    for (
      let i = 0;
      i < (<FormArray>this.PurchaseDetail.get('aliases')).length;
      i++
    ) {
      let temarr = (<FormArray>this.PurchaseDetail.get('aliases'))
        .at(i)
        .get('amount')?.value as unknown as number;
      calcInvoice = calcInvoice + temarr;
    }
    console.log(calcInvoice);

    this.PurchaseDetail.get('invoiceAmount')?.setValue(
      calcInvoice as unknown as string
    );
  }

  deliveryMin: any;
  dateMin(event: any) {
    this.deliveryMin = event.value;
    console.log(event.value);
  }

  fileChange(index: any, data: any) {
    let fileName = (<FormArray>this.PurchaseDetail.get('ProductAttachment'))
      .at(index)
      .get('file')?.value;
    // console.log(data.target.files[0].name);

    (<FormArray>this.PurchaseDetail.get('ProductAttachment'))
      .at(index)
      .get('name')
      ?.setValue(data.target.files[0].name);
  }

  fileDelete(i: any) {
    (<FormArray>this.PurchaseDetail.get('ProductAttachment')).removeAt(i);
    console.log('remove');
  }

  removeProduct(i: any) {
    (<FormArray>this.PurchaseDetail.get('aliases')).removeAt(i);
    console.log('remove');
  }
}
