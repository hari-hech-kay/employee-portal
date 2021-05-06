import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
})
export class AddemployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    department: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  isLoading: boolean = false;
  isDirty: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private location: Location
  ) {}

  submitForm() {
    this.isDirty = true;
    if (this.employeeForm.valid) {
      this.isLoading = true;
      console.log(this.employeeForm.value);
      this.addEmployee(this.employeeForm.value);
    }
  }
  addEmployee(employeeDetails: Employee) {
    this.employeeService
      .addEmployee(employeeDetails)
      .subscribe((result: any) => {
        console.log(result);
        this.isLoading = false;
        if (result['id'] !== null)
          this.notification.success(
            `${result['id']} - ${employeeDetails.firstName} ${employeeDetails.lastName}`,
            'Employee created!'
          );
        else
          this.notification.success(
            'Failed to create',
            'Something went wrong!'
          );
        this.location.back();
      });
  }
  ngOnInit(): void {}
}
