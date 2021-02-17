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
  static signIn: boolean;
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

  ngOnInit(): void {}

  isEmp(): void {
    this.emp = true;
    this.empr = false;
  }

  isEmpr(): void {
    this.emp = false;
    this.empr = true;
  }

  saveEmp(): void {
    var empskl = this.employee.skills.length.toString();
    var empSkills = empskl.split(', ');
    // for (let i = 0; i < this.employee.skills.length; i++) {
    //   const element = this.employee.skills[i];
    //   empSkills.unshift(element);
    // }
    
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
