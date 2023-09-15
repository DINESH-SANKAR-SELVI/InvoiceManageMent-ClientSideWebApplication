import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { ViewModelComponent } from './view-model/view-model.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path :'' , redirectTo: 'LogIn', pathMatch: 'full'},
  {path :'LogIn',title:"Start To Use" ,component: LogInPageComponent},
  {path :'Register' ,title: "Join With Us",component: RegisterPageComponent},
  {path :'DashBoard' ,title: "Welcome Page" ,component: DashboardComponent, 
  children:[
    { path:'', redirectTo: 'ViewEmployee' ,pathMatch:'full'},
    { path: 'ViewEmployee' ,title: "Employees" ,component:ViewEmployeeComponent },
    {path:'ViewEmployee/:id' ,component: ViewModelComponent},
    {path:'TableInfo' ,title: "TableOfContent" ,component: TableInfoComponent},
    {path: 'ViewEmployee/createData/:id' ,title: "make changes" ,component: CreateUserComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
