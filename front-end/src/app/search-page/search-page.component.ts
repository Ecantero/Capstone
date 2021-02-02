import { Component, OnInit } from '@angular/core';
import { FrontEndService } from 'src/app/services/front-end.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  people: any;
  currentPerson = null;
  currentIndex = -1;
  person = '';

  constructor(private frontEndService: FrontEndService) { }

  ngOnInit(): void {
    this.retrievePeople();
  }

  retrievePeople(): void {
    this.frontEndService.getAll()
      .subscribe(
        data => {
          this.people = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchPerson(): void {
    this.frontEndService.findByTitle(this.person)
      .subscribe(
        data => {
          this.people = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
