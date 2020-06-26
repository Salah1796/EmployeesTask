import { NgModule } from '@angular/core';
//import { RecursiveAstVisitor } from '@angular/compiler/src/output/output_ast';



import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ListEmployeesComponent } from '../Components/list-employees/list-employees.component';
import { EditEmployeeComponent } from '../Components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../Components/add-employee/add-employee.component';



@NgModule({
  declarations: [

    ListEmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
  
    EmployeeRoutingModule,
    SharedModule


  ],
  providers: [],
})
export class EmployeeModule { }
