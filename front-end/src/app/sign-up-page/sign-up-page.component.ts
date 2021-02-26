import { Component, OnInit } from '@angular/core';
import { FrontEndService } from 'src/app/services/front-end.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  static username: any;
  static signIn: boolean = false;
  static userEmp: boolean;
  static userEmpr: boolean;

  person = {
    name: '',
    age: 0,
    email: '',
    password: '',
  };

  employee = {
    skills: [],
  };
  emp = false;

  employer = {
    company: '',
  };
  empr = false;

  constructor(
    private frontEndService: FrontEndService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(`signed in state: ${SignUpPageComponent.signIn}`);
  }

  isEmp(): void {
    this.emp = true;
    this.empr = false;
  }

  isEmpr(): void {
    this.emp = false;
    this.empr = true;
  }

  saveEmp(): void {
    var empskl = this.employee.skills.toString();
    var empSkills = empskl.split(', ');

    SignUpPageComponent.username = this.person.name;
    SignUpPageComponent.signIn = true;
    SignUpPageComponent.userEmp = true;
    SignUpPageComponent.userEmpr = false;

    const data = {
      name: this.person.name,
      age: this.person.age,
      email: this.person.email,
      password: this.person.password,
      skills: empSkills,
    };
    console.log(
      `username: ${SignUpPageComponent.username}, 
      is Signed in: ${SignUpPageComponent.signIn}, 
      is employee: ${SignUpPageComponent.userEmp},
      is employer: ${SignUpPageComponent.userEmpr}`
    );
    console.log(
      `Employee name: ${data.name}, age: ${data.age}, email: ${data.email}, skills: ${data.skills}, password: ${data.password}`
    );
    this.frontEndService.createEmp(data).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/home']);
  }

  saveEmpr(): void {
    SignUpPageComponent.username = this.person.name;
    SignUpPageComponent.signIn = true;
    SignUpPageComponent.userEmpr = true;
    SignUpPageComponent.userEmp = false;

    const data = {
      name: this.person.name,
      age: this.person.age,
      email: this.person.email,
      password: this.person.password,
      company: this.employer.company,
    };
    console.log(
      `username: ${SignUpPageComponent.username}, 
      is Signed in: ${SignUpPageComponent.signIn}, 
      is employee: ${SignUpPageComponent.userEmp},
      is employer: ${SignUpPageComponent.userEmpr}`
    );
    console.log(data);
    this.frontEndService.createEmpr(data).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(['/home']);
  }
}
