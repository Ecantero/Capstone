import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontEndService } from './services/front-end.service';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  person = {
    email: '',
    password: '',
  };

  title = 'front-end';
  signedIn = SignUpPageComponent.signIn;
  msg = '';
  err = false;

  constructor(
    private frontEndService: FrontEndService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(`is signed in: ${SignUpPageComponent.signIn}`);
  }

  login(): void {
    console.log(
      `user's email logging in: ${this.person.email}, password: ${this.person.password}`
    );
    const data = {
      email: this.person.email,
      password: this.person.password,
    };

    this.frontEndService.userLogin(data).subscribe(
      (person: any) => {
        console.log(person);
        if (person.msg != '') {
          this.err = true;
          this.msg = person.msg;
        }
        this.err = false;
        this.signedIn = true;
        console.log('err: ' + this.err);
        this.router.navigate([`/userAcc/${person.id}`]);
      },
      (err: any) => {
        console.log(err);
        this.err = true;
        this.msg = 'No such user exists';
      }
    );
  }
}
