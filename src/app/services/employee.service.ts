import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080/api';
  constructor(private httpsClient: HttpClient) {}

  public listEmployees(): Observable<Employee[]> {
    return this.httpsClient.get<Employee[]>(this.API_URL + '/employees');
  }

  public updateEmployee(id: number, details: any): Observable<Employee> {
    console.log(details);

    return this.httpsClient.put<Employee>(
      this.API_URL + '/employees/' + id,
      details
    );
  }

  public removeEmployee(id: number): Observable<void> {
    return this.httpsClient.delete<void>(this.API_URL + '/employees/' + id);
  }
}
