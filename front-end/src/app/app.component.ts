import { Component } from '@angular/core';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
  signedIn = SignUpPageComponent.signIn;
}
