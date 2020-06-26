import { EmployeeService } from './../../Services/employee.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NationalIDValidators } from 'src/app/shared/NationalID.Validators';
import { PhoneValidators } from 'src/app/shared/phone.validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmailValidators } from 'src/app/shared/Email.vaildators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  AddEmployeeFrom: FormGroup
  Employee: Employee
  Jops: { ID: Number, Name: string }[]
  SavingData = false
  constructor(private empService: EmployeeService, private toaster: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.empService.GetAllJops().subscribe(res => {
      if (res.Successed) {
        this.Jops = res.Data
        this.JobID.setValue(this.Jops[0].ID)// =this.Jops[0].ID
      }
      else
        this.toaster.error("حدث خطأ ما")
    })

    
    this.AddEmployeeFrom = new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      Email: new FormControl("", [Validators.required,EmailValidators.validEmail]),
      NationalID: new FormControl("", [Validators.required, NationalIDValidators.validNationalID]),
      IsActive: new FormControl(true, Validators.required),
      JobID: new FormControl(null, Validators.required),
      Phone: new FormControl("", [Validators.required, PhoneValidators.validPhone]),
      Gender: new FormControl("", Validators.required)
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
      0,
      this.AddEmployeeFrom.value.Name,
      this.AddEmployeeFrom.value.Email,
      this.AddEmployeeFrom.value.NationalID,
      this.AddEmployeeFrom.value.IsActive,
      this.AddEmployeeFrom.value.JobID,
      this.AddEmployeeFrom.value.Phone,
      this.AddEmployeeFrom.value.Gender
    )
    this.empService.AddEmployee(this.Employee).subscribe(res => {
      this.SavingData = false
      if (res.Successed) {
        this.toaster.success("تم اضافة الموظف بنجاح").onHidden.subscribe(() => {
          this.route.navigateByUrl("/employees");
        })
      }
      else
      this.toaster.error("حدث خطأ ما")
    })
  }
}
