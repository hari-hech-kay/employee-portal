import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  isLoading: boolean = false;
  isDirty: boolean = false;
  //  egsisterFailed: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  submitForm() {
    this.isDirty = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log(this.loginForm.value);
      this.onLogin(this.loginForm.value);
    }
  }
  onLogin(loginDetails: any) {
    this.authService
      .login(loginDetails['username'], loginDetails['password'])
      .subscribe(
        (response: string) => {
          console.log(response);
          this.tokenService.saveToken(response);
          this.tokenService.saveUser(response);
          this.router.navigate(['/employee-list']);
        },
        (error: HttpErrorResponse) => {
          this.message = `${error.status}: ${error.error.error} ${error.error.message}`;
          this.isLoading = false;
          this.notification.error('Something went wrong', this.message);
        }
      );
  }
  ngOnInit(): void {
    // if (this.tokenService.getToken() !== null)
    //   this.router.navigate(['/employee-list'], { replaceUrl: true });
  }
}
