import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { DataProviderService, TableType } from '../data-provider.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableType>;

 // ELEMENT_DATA!: TableType[];
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'email' ,'phoneNumber' ,'password'];
  dataSource !: MatTableDataSource<TableType>;

  constructor( private dataProvider :DataProviderService) {
     this.dataProvider.getAllUser().subscribe((result)=> { this.dataSource = new MatTableDataSource(result);});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addData() {
    // const randomElementIndex = Math.floor(Math.random() * this.ELEMENT_DATA!.length);
    // this.dataSource.data.push(this.ELEMENT_DATA[randomElementIndex]);
    // this.table.renderRows();

    console.warn(this.dataSource.data);
  }

  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
    
    console.warn(this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}