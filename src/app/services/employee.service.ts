import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private API_URL = https://employee-portal-backend.herokuapp.com;
  constructor(private httpsClient: HttpClient) {}

  public listEmployees() {
    return this.httpsClient.get(this.API_URL + '/employees');
  }

  public updateEmployee(id: number, details: Employee) {
    return this.httpsClient.put(this.API_URL + '/employees/' + id, details);
  }

  public removeEmployee(id: number) {
    return this.httpsClient.delete(this.API_URL + '/employees/' + id);
  }

  public addEmployee(details: Employee) {
    return this.httpsClient.post(this.API_URL + '/employees/', details);
  }
}
