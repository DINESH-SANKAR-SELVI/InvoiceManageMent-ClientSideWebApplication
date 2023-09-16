import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { DataProviderService, TableType } from '../data-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent {//implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableType>;

 // ELEMENT_DATA!: TableType[];
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'email' ,'phoneNumber' ,'password', 'action'];
  dataSource !: MatTableDataSource<TableType>;

  constructor( private dataProvider :DataProviderService, private route:Router ,private currentPath: ActivatedRoute) {
     this.dataProvider.getAllUser().subscribe((result)=> { this.dataSource = new MatTableDataSource(result);});
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // addData() {

  //   console.warn(this.dataSource.data);
  // }

  removeData(id:string) {
    this.dataProvider.deleteById(id).subscribe();

    // this.dataSource.data.pop();
     this.table.renderRows();
     this.route.navigate(['..'],{ relativeTo: this.currentPath});

    // console.warn(this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}