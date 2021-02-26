import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontEndService } from 'src/app/services/front-end.service';
import { SignUpPageComponent } from '../sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-user-acc-page',
  templateUrl: './user-acc-page.component.html',
  styleUrls: ['./user-acc-page.component.scss'],
})
export class UserAccPageComponent implements OnInit {
  user: any;
  name = SignUpPageComponent.username;
  isEmployee = SignUpPageComponent.userEmp;
  isEmployer = SignUpPageComponent.userEmpr;
  msg = '';
  complete = false;
  id = this.route.snapshot.paramMap.get('id');

  job = {
    title: '',
    name: '',
    desc: '',
  };

  person = {
    name: '',
    age: 0,
    email: '',
    password: '',
  };

  emp = {
    company: '',
  }

  constructor(
    private frontEndService: FrontEndService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePerson(this.id);
    console.log(this.id);
    this.isEmployer = true;
    console.log(this.isEmployer);
  }

  retrievePerson(id: any): void {
    this.frontEndService.get(id).subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser(): void {
    const data = {
      name: this.person.name,
      email: this.person.email,
      password: this.person.password,
      age: this.person.age,
      company: this.emp.company,
    }
  }

  postJob(): void {
    const data = {
      title: this.job.title,
      name: this.job.name,
      desc: this.job.desc,
    };
    this.frontEndService.createJob(data).subscribe(
      (response) => {
        console.log(response);
        this.msg = "job posted";
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
