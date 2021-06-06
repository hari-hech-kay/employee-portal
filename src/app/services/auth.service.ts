import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(
      AUTH_API + '/login',
      { username: username, password: password },
      httpOptions
    );
  }

  register(employee: any): Observable<string> {
    return this.http.post<string>(
      AUTH_API + '/register',
      employee,
      httpOptions
    );
  }

  isAuthenticated() {
    const token = this.tokenService.getToken();
    console.log(token);

    if (token !== null) return !new JwtHelperService().isTokenExpired(token);

    return false;
  }
}
