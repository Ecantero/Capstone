import { Component, OnInit } from '@angular/core';
import { FrontEndService } from '../services/front-end.service';

@Component({
  selector: 'app-job-listings-page',
  templateUrl: './job-listings-page.component.html',
  styleUrls: ['./job-listings-page.component.scss'],
})
export class JobListingsPageComponent implements OnInit {
  jobs: any;
  title = '';

  constructor(private frontEndService: FrontEndService) {}

  ngOnInit(): void {}

  retrieveJobList(): void {
    this.frontEndService.getAll().subscribe(
      (data) => {
        this.jobs = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  searchJob(): void {
    this.frontEndService.findByJob(this.title).subscribe(
      (data) => {
        this.jobs = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
