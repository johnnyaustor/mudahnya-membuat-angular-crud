import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Array<Employee> = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.employeeService.getAll().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employees);

      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("done");
      }
    )
  }

  onDelete(emp: Employee) {
    this.employeeService.delete(emp.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("done");
        this.employees.splice(this.employees.indexOf(emp), 1);
      }
    )
  }

}
