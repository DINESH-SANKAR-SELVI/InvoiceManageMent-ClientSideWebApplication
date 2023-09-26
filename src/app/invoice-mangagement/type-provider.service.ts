import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    country: string;
    state: string;
    city: string;
  };
  deliveryDate: string;
  purchaseDate: string;
  customerOrderNo: string;
  invoiceAmount: number;
}

export interface invoiceOrder {
  id: string;
  Sn: string;
  ItemName: string;
  Toqty: number;
  uom: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TypeProviderService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  API_URL: string = 'http://localhost:3000/Purchase';

  API_URL_Invoice = 'http://localhost:3000/invoice';

  getAllPurchase(): Observable<any> {
    return this.http
      .get<PurchaseOrder>(this.API_URL)
      .pipe(map((result) => result));
  }

  PostPurchase(Data: PurchaseOrder) {
    console.log(this.API_URL, Data);
    return this.http.post<PurchaseOrder>(
      this.API_URL,
      JSON.parse(JSON.stringify(Data)),
      this.httpOptions
    );
  }

  postInvoice(Data: invoiceOrder) {
    console.log(this.API_URL_Invoice, Data);
    return this.http.post<PurchaseOrder>(
      this.API_URL_Invoice,
      JSON.parse(JSON.stringify(Data)),
      this.httpOptions
    );
  }
}
