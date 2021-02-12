import { Component, OnInit } from '@angular/core';
import { FrontEndService } from 'src/app/services/front-end.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
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

  constructor(private frontEndService: FrontEndService) {}

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
    var empSkills: String[] = [];
    for (let i = 0; i < this.employee.skills.length; i++) {
      const element = this.employee.skills[i];
      empSkills.unshift(element);
    }
    const data = {
      name: this.person.name,
      age: this.person.age,
      email: this.person.email,
      password: this.person.password,
      skills: empSkills.reverse(),
    };

    this.frontEndService.createEmp(data).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveEmpr(): void {
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
  }

}
