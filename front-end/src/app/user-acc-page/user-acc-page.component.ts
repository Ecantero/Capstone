import { Component, OnInit } from '@angular/core';
import { FrontEndService } from 'src/app/services/front-end.service';

@Component({
  selector: 'app-user-acc-page',
  templateUrl: './user-acc-page.component.html',
  styleUrls: ['./user-acc-page.component.scss']
})
export class UserAccPageComponent implements OnInit {
  user: any;

  constructor( private frontEndService: FrontEndService) { }

  ngOnInit(): void {
    this.retrievePerson();
  }

  retrievePerson(): void {
    this.frontEndService.getAll()
      .subscribe(
        data => {
          this.user = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
