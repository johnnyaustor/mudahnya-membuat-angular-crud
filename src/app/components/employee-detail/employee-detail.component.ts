import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  form: FormGroup;
  isNew: boolean = true;
  employee: Employee = new Employee();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.initReactiveForm();
    this.activatedRoute.params.subscribe(param => {
      if (param.id == 0) {
        this.isNew = true;
      } else {
        this.isNew = false;
        this.initUpdate(param.id);
      }
    });
  }

  initReactiveForm() {
    this.form = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control('')
    });

    this.form.get('firstName').valueChanges.subscribe(val => { this.employee.firstName = val });
    this.form.get('lastName').valueChanges.subscribe(val => { this.employee.lastName = val });
  }

  initUpdate(id) {
    this.employeeService.getDetail(id).subscribe(
      data => {
        this.employee = data;
        this.form.patchValue(data);
      },
      error => { console.log(error); }
    )
  }

  onFormSubmit() {
    console.log(this.form.value);
    if (this.isNew) {
      this.postData();
    } else {
      this.updateData();
    }
  }

  postData() {
    this.employeeService.post(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/employee']);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("done");
      }
    );
  }

  updateData() {
    this.employeeService.put(this.employee.id, this.employee).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/employee']);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("done");
      }
    );
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(["/employee"]);
    console.log("h");

  }

}
