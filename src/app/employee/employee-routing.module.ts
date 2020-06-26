import { EditEmployeeComponent } from './../Components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './../Components/add-employee/add-employee.component';
import { ListEmployeesComponent } from './../Components/list-employees/list-employees.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
    {path:'' ,component:ListEmployeesComponent},
    {path:'add' ,component:AddEmployeeComponent} , 
    {path:'edit/:id' ,component:EditEmployeeComponent}  
  
  
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
