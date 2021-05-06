import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css'],
})
export class UpdateemployeeComponent implements OnInit {
  @Input() details: Employee = {} as Employee;

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    department: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
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
  updateEmployee(id: number, employeeDetails: Employee) {
    this.employeeService
      .updateEmployee(id, employeeDetails)
      .subscribe((result: any) => {
        console.log(result);
        this.isLoading = false;
        this.isVisible = false;
        if (result['id'] !== null)
          this.notification.success(
            `${result['id']} - ${employeeDetails.firstName} ${employeeDetails.lastName}`,
            'Employee details updated!'
          );
        else
          this.notification.success(
            'Failed to Update',
            'Something went wrong!'
          );
      });
  }
  ngOnInit(): void {
    this.employeeForm.setValue(this.details);
  }
}
