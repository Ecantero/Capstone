import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontEndService } from '../services/front-end.service';

@Component({
  selector: 'app-user-result-page',
  templateUrl: './user-result-page.component.html',
  styleUrls: ['./user-result-page.component.scss'],
})
export class UserResultPageComponent implements OnInit {
  userData: any;
  msg = '';

  constructor(
    private frontEndService: FrontEndService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.msg = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id: any): void{
    this.frontEndService.get(id)
    .subscribe(data => {
      this.userData = data;
      console.log(data);
    },
    err => {
      console.log(err);
    });
  }
}
