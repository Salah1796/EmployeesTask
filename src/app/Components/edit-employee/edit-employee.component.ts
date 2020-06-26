import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NationalIDValidators } from 'src/app/shared/NationalID.Validators';
import { PhoneValidators } from 'src/app/shared/phone.validators';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  AddEmployeeFrom: FormGroup
  Employee:Employee
  Jops: { ID: Number, Name: string }[]
  SavingData = false
  EmpID:Number
  constructor(private empService: EmployeeService, private toaster: ToastrService, private route: Router,
    private myActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.AddEmployeeFrom = new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      Email: new FormControl("", [Validators.required, Validators.email]),
      NationalID: new FormControl("", [Validators.required, NationalIDValidators.validNationalID]),
      IsActive: new FormControl(true, Validators.required),
      JobID: new FormControl(null, Validators.required),
      Phone: new FormControl("", [Validators.required, PhoneValidators.validPhone]),
      Gender: new FormControl("1", Validators.required)
    })
    this.EmpID=this.myActivatedRoute.snapshot.params['id'];
    this.empService.GetEmployee(this.EmpID).subscribe(res => {
      if (res.Successed) {
        this.Employee = res.Data
        this.Name.setValue(this.Employee.Name)
        this.Email.setValue(this.Employee.Email)
        this.NationalID.setValue(this.Employee.NationalID)
        this.IsActive.setValue(this.Employee.IsActive)
        this.JobID.setValue(this.Employee.JobID)
        this.Phone.setValue(this.Employee.Phone)
        this.Gender.setValue(String( this.Employee.Gender))
      }
      else
        this.toaster.error("حدث خطأ ما")
    })
    this.empService.GetAllJops().subscribe(res => {
      if (res.Successed) {
        this.Jops = res.Data
        this.JobID.setValue(this.Jops[0].ID)// =this.Jops[0].ID
      }
      else
        this.toaster.error("حدث خطأ ما")
    })
   
  }

  get Name() {
    return this.AddEmployeeFrom.get("Name")
  }
  get Email() {
    return this.AddEmployeeFrom.get("Email")
  }
  get NationalID() {
    return this.AddEmployeeFrom.get("NationalID")
  }
  get IsActive() {
    return this.AddEmployeeFrom.get("IsActive")
  }
  get JobID() {
    return this.AddEmployeeFrom.get("JobID")
  }
  get Phone() {
    return this.AddEmployeeFrom.get("Phone")
  }
  get Gender() {
    return this.AddEmployeeFrom.get("Gender")
  }
  Save() {
    this.SavingData = true
    console.log(this.AddEmployeeFrom.value)
    this.Employee = new Employee(
      this.EmpID,
      this.AddEmployeeFrom.value.Name,
      this.AddEmployeeFrom.value.Email,
      this.AddEmployeeFrom.value.NationalID,
      this.AddEmployeeFrom.value.IsActive,
      this.AddEmployeeFrom.value.JobID,
      this.AddEmployeeFrom.value.Phone,
      this.AddEmployeeFrom.value.Gender
    )
    this.empService.EditEmployee(this.Employee).subscribe(res => {
      this.SavingData = false
      if (res.Successed) {
        this.toaster.success("تم تعديل بيانات  الموظف بنجاح").onHidden.subscribe(() => {
          this.route.navigateByUrl("/employees");
        })
      }
      else
        this.toaster.error("حدث خطأ ما")
    })
  }
  
}
