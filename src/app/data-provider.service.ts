import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  URL:string = "http://localhost:3000/userData";

  getAllUser(): Observable<any>{
    console.log(this.URL);
    return this.http.get<TableType[]>(this.URL);
  }

  getUserById(id:string): Observable<any> {
    console.log(this.URL);
    return this.http.get<TableType>(this.URL+'/'+id);
  }

  updateById(id:any ,data: TableType){
    console.log(this.URL, data)
    return this.http.put<TableType>(this.URL+'/'+id,JSON.parse(JSON.stringify(data)),this.httpOptions);
  }

  postData(data:TableType){
    console.log(this.URL, data)
    return this.http.post<TableType>(this.URL,JSON.parse(JSON.stringify(data)),this.httpOptions);
  }

  deleteById(id:any){
    console.warn(this.URL+'/'+id);
    return this.http.delete(this.URL+'/'+id,this.httpOptions);
  }

    dateFormat(date:any,format:any){
      if(date){
        const pipe =new DatePipe('en-US');
        return pipe.transform(date,format);
      }
      else{
        return date
      }
    }
}
