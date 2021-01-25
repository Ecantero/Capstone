import { Component, OnInit } from '@angular/core';
import { FrontEndService } from 'src/app/services/front-end.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  employee = {
    name: '',
    age: 0,
    email: '',
    password: '',
    skills: [],
  };

  employer = {
    name: '',
    age: 0,
    email: '',
    password: '',
    company: '',
  };

  constructor(private frontEndService: FrontEndService) {}

  ngOnInit(): void {}

  saveEmp(): void {
    const data = {
      name: this.employee.name,
      age: this.employee.age,
      email: this.employee.email,
      password: this.employee.password,
    };

    this.frontEndService.create(data).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  newEmp(): void {
    //
  }
}
