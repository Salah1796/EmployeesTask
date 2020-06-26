import { Router } from '@angular/router';
import { element } from 'protractor';
import { EmployeeService } from './../../Services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Employee } from 'src/app/Models/Employee';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  PageIndex = 0
  PageSize = 10
  SortField: string = "ID"
  Ascending: boolean = true
  name = 'NGX-UI-LOADER';
   Employees: Employee[]
  CheckAll: boolean = false
  Count: Number
  options = { itemsPerPage: this.PageSize, currentPage: this.PageIndex, id: 'pagination', totalItems: 100 }
  constructor( private router:Router, private ngxLoader: NgxUiLoaderService, private empService: EmployeeService, private toster: ToastrService) { }
  ngOnInit(): void {

    this.Getall()
  }
  getNextPrevData(pageIndex) {
    this.PageIndex = Number(pageIndex) - 1;
    console.log("PageIndex", pageIndex)
    this.Getall();
    this.options.currentPage = pageIndex;
  } 

  change(id) {
    this.empService.ChangeStatuste(id).subscribe(res => {

      if (res.Successed) {
        this.toster.success("تم تعديل حالة الموظف بنجاح ")
        console.log(res)
      }
      else {
        this.toster.error(" حدث خطأ")
      }


    })


  }
  Getall() {
    this.ngxLoader.start();
    this.empService.GetAll(this.PageIndex, this.PageSize, this.SortField, this.Ascending).subscribe(res => {
      if (res.Successed) {
        if (res.Data.length == 0) {
          this.toster.info("لا يوجد موظفين")
        }
        this.Employees = res.Data
        this.Count = res.Count
        this.options.totalItems = res.Count;
        this.options.currentPage = this.PageIndex + 1
        console.log("res.Coun", this.options.totalItems)
        setTimeout(() => {
          this.ngxLoader.stop();
        }, 30000);
      }
    })
  }
  Edit(id) {
    this.router.navigateByUrl(`employees/edit/${id}`)

  } 
  Delete(id) {
    let DeletedElmntsId: Number[] = new Array()
    DeletedElmntsId.push(id)
    console.log( document.querySelectorAll(".checkdel"))
    document.querySelectorAll(".checkdel").forEach(function (element: any) {
      if (element.checked) {
        DeletedElmntsId.push(Number(element.id))
        console.log(element.id)
      }
    })
    console.log(DeletedElmntsId)
    this.empService.DeleteAll(DeletedElmntsId).subscribe(res => {
      if (res.Successed) {
        DeletedElmntsId.forEach((id: any) =>{
        this.Employees.splice(this.Employees.findIndex(i => i.ID == id), 1)
      })
      this.toster.success("تم الحذف بنجاح ")
        this.Getall()
      }
      else
        this.toster.error("حدث خطأ اثناء الحذف")
    })
  }
  IdAsc() {
    this.PageIndex = 0;
    document.getElementById("IdAsc").style.color = "white";
    document.getElementById("IdDesc").style.color = "gainsboro";
    this.SortField = "ID"
    this.Ascending = true
    this.Getall()
  }
  IdDesc() {
    this.PageIndex = 0;
    document.getElementById("IdAsc").style.color = "gainsboro";
    document.getElementById("IdDesc").style.color = "white";
    this.SortField = "ID"
    this.Ascending = false
    this.Getall()
  }

  NameAsc() {
    this.PageIndex = 0;
    document.getElementById("NameAsc").style.color = "white";
    document.getElementById("NameDesc").style.color = "gainsboro";
    this.SortField = "Name"
    this.Ascending = true
    this.Getall()
  }
  NameDesc() {
    this.PageIndex = 0;
    document.getElementById("NameAsc").style.color = "gainsboro";
    document.getElementById("NameDesc").style.color = "white";
    this.SortField = "Name"
    this.Ascending = false
    this.Getall()
  }

  JobAsc() {
    this.PageIndex = 0;
    document.getElementById("JobAsc").style.color = "white";
    document.getElementById("JobDesc").style.color = "gainsboro";
    this.SortField = "JobID"
    this.Ascending = true
    this.Getall()
  }
  JobDesc() {
    this.PageIndex = 0;
    document.getElementById("JobAsc").style.color = "gainsboro";
    document.getElementById("JobDesc").style.color = "white";
    this.SortField = "JobID"
    this.Ascending = false
    this.Getall()
  }

  PhoneAsc() {
    this.PageIndex = 0;
    document.getElementById("PhoneAsc").style.color = "white";
    document.getElementById("PhoneDesc").style.color = "gainsboro";
    this.SortField = "Phone"
    this.Ascending = true
    this.Getall()
  }
  PhoneDesc() {
    this.PageIndex = 0;
    document.getElementById("PhoneAsc").style.color = "gainsboro";
    document.getElementById("PhoneDesc").style.color = "white";
    this.SortField = "Phone"
    this.Ascending = false
    this.Getall()
  }

  EmailAsc() {
    this.PageIndex = 0;

    document.getElementById("EmailAsc").style.color = "white";
    document.getElementById("EmailDesc").style.color = "gainsboro";
    this.SortField = "Email"
    this.Ascending = true
    this.Getall()
    // this.SortBy = 2;
    // this.Search()
  }
  EmailDesc() {
    this.PageIndex = 0;
    document.getElementById("EmailAsc").style.color = "gainsboro";
    document.getElementById("EmailDesc").style.color = "white";
    this.SortField = "Email"
    this.Ascending = false
    this.Getall()
  }

  DateAsc() {
    this.PageIndex = 0;
    document.getElementById("DateAsc").style.color = "white";
    document.getElementById("DateDesc").style.color = "gainsboro";
    this.SortField = "Date"
    this.Ascending = true
    this.Getall()
  }
  DateDesc() {
    this.PageIndex = 0;
    document.getElementById("DateAsc").style.color = "gainsboro";
    document.getElementById("DateDesc").style.color = "white";
    this.SortField = "Date"
    this.Ascending = false
    this.Getall()
  }

  StatusAsc() {
    this.PageIndex = 0;
    document.getElementById("StatusAsc").style.color = "white";
    document.getElementById("StatusDesc").style.color = "gainsboro";
    this.SortField = "IsActive"
    this.Ascending = true
    this.Getall()
  }
  StatusDesc() {
    this.PageIndex = 0;
    document.getElementById("StatusAsc").style.color = "gainsboro";
    document.getElementById("StatusDesc").style.color = "white";
    this.SortField = "IsActive"
    this.Ascending = false
    this.Getall()
  }
}
