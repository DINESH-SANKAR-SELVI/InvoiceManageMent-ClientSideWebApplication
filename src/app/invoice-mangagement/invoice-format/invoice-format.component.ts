import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TypeProviderService } from '../type-provider.service';

@Component({
  selector: 'app-invoice-format',
  templateUrl: './invoice-format.component.html',
  styleUrls: ['./invoice-format.component.css']
})
export class InvoiceFormatComponent { 
  
  constructor (private fb: FormBuilder ,private TypeProvider: TypeProviderService) { }

  profileForm = this.fb.group({
    aliases: this.fb.array([
      this.fb.group(  {
        id: this.generateRandomId(),
        Sn: '1',
        ItemName: 'apple',
        Toqty: 1,
        uom: 'KG',
        price: 120,
        amount: 120
      })
    ])
  });

  invoiceValue:any =[];

  showAndPostData(event:any){
    console.log("posted and showed");
    this.invoiceValue = [];
    
    for(let i=0;i<(<FormArray>this.profileForm.get('aliases')).length;i++){
      let temarr = (Object.values((<FormArray>this.profileForm.get('aliases')).at(i).value) as unknown as Array<any>);
      this.invoiceValue.push(temarr);

      let splitValue=((<FormArray>this.profileForm.get('aliases')).at(i).value);
      let valueOfInvoice = JSON.parse(JSON.stringify(splitValue));
      this.TypeProvider.postInvoice(valueOfInvoice).subscribe((result)=>{console.log(result, i , "Items added")});
    }
    console.warn(this.invoiceValue);

    this.profileForm.reset();
  }

  amountChange(index:any){
    let quantity =(<FormArray>this.profileForm.controls['aliases']).at(index)?.get('Toqty')?.value;
    let price = (<FormArray>this.profileForm.controls['aliases']).at(index)?.get('price')?.value;
    let amountOfFinal = Number( Number(quantity) * Number(price));

    (<FormArray>this.profileForm.controls['aliases']).at(index)?.get('amount')?.setValue(amountOfFinal);
    
    console.log("index",index ,"price", price, "quantity" ,quantity ,"amount",amountOfFinal);
  }
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  generateRandomId(): string {
    const min = 100000; 
    const max = 999999; 
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomId.toString();
  }

  addAlias() {
    this.aliases.push(this.fb.group(  {
      id: this.generateRandomId(),
      Sn: '1',
      ItemName: 'apple',
      Toqty: 1,
      uom: 'KG',
      price: 120,
      amount: 120
    }));
  }
}
 