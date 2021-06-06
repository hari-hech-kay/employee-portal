import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css'],
})
export class UpdateemployeeComponent implements OnInit {
  @Input() details: Employee = {} as Employee;

  employeeForm: FormGroup = new FormGroup({
    // roles: new FormControl(null, Validators.required),
    firstName: new FormControl(this.details.firstName, Validators.required),
    lastName: new FormControl(this.details.lastName, Validators.required),
    department: new FormControl(this.details.department, Validators.required),
    designation: new FormControl(this.details.designation, Validators.required),
    salary: new FormControl(this.details.salary, [
      Validators.required,
      Validators.min(0),
    ]),
    email: new FormControl(this.details.email, [
      Validators.required,
      Validators.email,
    ]),
  });

  isLoading: boolean = false;
  isVisible: boolean = false;
  isDirty: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private notification: NzNotificationService
  ) {}

  openEdit() {
    this.isVisible = true;
  }

  submitUpdate() {
    this.isDirty = true;
    if (this.employeeForm.valid) {
      this.isLoading = true;
      console.log(this.employeeForm.value);
      this.updateEmployee(this.details.id, this.employeeForm.value);
    }
  }
  updateEmployee(id: number, employeeDetails: any) {
    this.employeeService.updateEmployee(id, employeeDetails).subscribe(
      (result: Employee) => {
        console.log(result);
        this.isLoading = false;
        this.isVisible = false;
        this.notification.success(
          `${result['id']} - ${employeeDetails.firstName} ${employeeDetails.lastName}`,
          'Employee details updated!'
        );
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.notification.success(
          'Failed to Update',
          `${error.status}: ${error.error.error} ${error.error.message}`
        );
      }
    );
  }
  ngOnInit(): void {
    const data = {
      //roles: this.details.roles[0].name,
      firstName: this.details.firstName,
      lastName: this.details.lastName,
      department: this.details.department,
      designation: this.details.designation,
      salary: this.details.salary,
      email: this.details.email,
    };
    this.employeeForm.setValue(data);
  }
}
