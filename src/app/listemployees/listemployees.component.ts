import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.css'],
})
export class ListemployeesComponent implements OnInit {
  public employees: Employee[] = [];
  public isLoading: boolean = false;
  public tableLoading: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private notification: NzNotificationService
  ) {}

  removeEmployee(emp: Employee) {
    this.isLoading = true;
    this.employeeService.removeEmployee(emp.id).subscribe((result: any) => {
      console.log(result);
      this.isLoading = false;
      if (result['deleted']) {
        this.employees.splice(this.employees.indexOf(emp), 1);
        this.employees = [...this.employees];
        console.log(this.employees);

        this.notification.success(
          `${emp.id} - ${emp.firstName} ${emp.lastName}`,
          'Employee removed!'
        );
      } else
        this.notification.success('Failed to remove', 'Something went wrong!');
      //this.employees.
    });
  }

  ngOnInit(): void {
    this.employeeService.listEmployees().subscribe((result) => {
      console.log(result);
      this.tableLoading = false;
      this.employees = result as Employee[];
    });
  }
}
