import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    roles: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    department: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  isLoading: boolean = false;
  isDirty: boolean = false;
  //  egsisterFailed: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  submitForm() {
    this.isDirty = true;

    this.isLoading = true;
    console.log(this.employeeForm.value);
    this.onRegister(this.employeeForm.value);
    // } else {
    //   console.log(this.employeeForm.errors);
    // }
  }
  onRegister(employeeDetails: any) {
    this.authService.register(employeeDetails).subscribe(
      (response: string) => {
        console.log(response);
        this.message = response;
        // this.registerSuccessful = true;
        this.notification.success(
          `${employeeDetails.firstName} ${employeeDetails.lastName}`,
          response
        );
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.message = `${error.status}: ${error.error.error} ${error.error.message}`;
        //this.regsisterFailed = true;
        this.notification.error('Something went wrong', this.message);
      }
    );
  }
  ngOnInit(): void {}
}
