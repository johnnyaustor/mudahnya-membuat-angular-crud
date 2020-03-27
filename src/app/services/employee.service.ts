import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  host = environment.host.concat("/employee");
  header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  });

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get<Array<Employee>>(`${this.host}`);
  }

  public getDetail(id: string) {
    return this.httpClient.get<Employee>(`${this.host}/${id}`);
  }

  public post(data) {
    return this.httpClient.post(`${this.host}`, data);
  }

  public put(id: any, data: any) {
    return this.httpClient.put(`${this.host}/${id}`, data, { headers: this.header });
  }

  public delete(id: any) {
    return this.httpClient.delete(`${this.host}/${id}`, { headers: this.header });
  }
}
