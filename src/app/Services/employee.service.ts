import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }


  GetAll(PageIndex,PageSize,SortField,Ascending): any {
    return this.apiService.get(`Employee/GetAll?PageIndex=${PageIndex}&PageSize=${PageSize}&SortField=${SortField}&Ascending=${Ascending}`)
  }
  GetEmployee(id): any {
    return this.apiService.get(`Employee/GetByID?id=${id}`)
  }
  AddEmployee(Employee):any{
    return this.apiService.post(`Employee/Add`, JSON.stringify(Employee))
  }


  EditEmployee(Employee):any{
    return this.apiService.post(`Employee/Update`, JSON.stringify(Employee))
  }

  GetAllJops(): any {
    return this.apiService.get(`Job/GetAll`)
  }

  DeleteAll(IDs:Number[]): any {
    console.log("IDs",IDs)
    return this.apiService.get(`Employee/Delete?EmpIDs=${IDs.join(',')}`)
  }
   
  ChangeStatuste(id): any {
    return this.apiService.get(`Employee/ChangeStatus?id=${id}`)
  }

}
