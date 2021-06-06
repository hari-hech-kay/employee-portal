import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  helper = new JwtHelperService();
  constructor() {}

  logout(): void {
    window.sessionStorage.clear();
  }

  saveToken(jwt: string): void {
    window.sessionStorage.setItem('jwt', jwt);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('jwt');
  }
  saveUser(jwt: string): void {
    const user = this.helper.decodeToken(jwt);
    console.log(user);

    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): string | null {
    return window.sessionStorage.getItem('user');
  }
}
