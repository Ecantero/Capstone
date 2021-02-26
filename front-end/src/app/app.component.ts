import { Component, OnInit } from '@angular/core';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front-end';
  signedIn = SignUpPageComponent.signIn;

  ngOnInit(): void {
    console.log(`is signed in: ${SignUpPageComponent.signIn}`);
  }
}
