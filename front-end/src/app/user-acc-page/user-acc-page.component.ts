import { Component, OnInit } from '@angular/core';
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

  job = {
    title: '',
    name: '',
    desc: '',
  };

  constructor(private frontEndService: FrontEndService) {}

  ngOnInit(): void {
    this.retrievePerson();
  }

  retrievePerson(): void {
    this.frontEndService.findByName(this.name).subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
