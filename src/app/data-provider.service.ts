import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export type TableType ={
    id: string,
    name:{
        firstName:string,
        lastName :string
    },
    gender: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: number,
    password: string        
  }

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any>{
    return this.http.get<TableType[]>('./assets/data.json')
  }


}
