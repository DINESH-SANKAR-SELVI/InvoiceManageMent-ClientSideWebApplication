import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { TableInfoComponent } from './table-info/table-info.component';

const routes: Routes = [
  {path :'' , redirectTo: 'LogIn', pathMatch: 'full'},
  {path :'LogIn',title:"Start To Use" ,component: LogInPageComponent},
  {path :'Register' ,title: "Join With Us",component: RegisterPageComponent},
  {path :'DashBoard' ,title: "Welcome Page" ,component: DashboardComponent, children:[{ path:'', redirectTo: 'ViewEmployee' ,pathMatch:'full'},{ path: 'ViewEmployee' ,title: "Employees" ,component:ViewEmployeeComponent},{path:'TableInfo' ,title: "TableOfContent" ,component: TableInfoComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
