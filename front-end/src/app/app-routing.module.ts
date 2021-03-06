import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JobListingsPageComponent } from './job-listings-page/job-listings-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { UserAccPageComponent } from './user-acc-page/user-acc-page.component';
import { UserResultPageComponent } from './user-result-page/user-result-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'jobListings', component: JobListingsPageComponent},
  {path: 'signUp', component: SignUpPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'userAcc/:id', component: UserAccPageComponent},
  {path: 'user/:id', component: UserResultPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
