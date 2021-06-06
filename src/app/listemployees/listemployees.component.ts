import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Employee } from '../models/Employee';
//import { JwtClaims } from '../models/JwtResponse';
import { EmployeeService } from '../services/employee.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.css'],
})
export class ListemployeesComponent implements OnInit {
  public employees: Employee[] = [];
  public user: any;
  public isLoading: boolean = false;
  public tableLoading: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private tokenService: TokenStorageService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }

  removeEmployee(emp: Employee) {
    this.isLoading = true;
    this.employeeService.removeEmployee(emp.id).subscribe(
      (result: void) => {
        console.log(result);
        this.isLoading = false;
        this.employees.splice(this.employees.indexOf(emp), 1);
        this.employees = [...this.employees];
        console.log(this.employees);

        this.notification.success(
          `${emp.id} - ${emp.firstName} ${emp.lastName}`,
          'Employee removed!'
        );
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error.status);
        console.log(error.toString());
        console.log(error.error);
        this.notification.success(
          'Failed to remove',
          `${error.status}: ${error.error.error} ${error.error.message}`
        );
      }
    );
  }

  ngOnInit(): void {
    this.user = JSON.parse(this.tokenService.getUser() ?? '{}');
    this.employeeService.listEmployees().subscribe(
      (result: Employee[]) => {
        console.log(result);
        this.tableLoading = false;
        this.employees = result;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error.status);
        console.log(error.toString());
        console.log(error.error);

        this.notification.success(
          'Error',
          `${error.status}: ${error.error.error} ${error.error.message}`
        );
      }
    );
  }
}
