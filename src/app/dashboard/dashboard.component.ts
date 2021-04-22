import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable}  from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  title = "Hotels"
  sideList = 0

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {

  }

  onClick(tab: any){
    switch(tab){
      //For hotels
      case 0:
        this.sideList = 0;
        this.title = "Hotels"
        break;
      //For bookings
      case 1:
        this.sideList = 1;
        this.title = "Bookings"
        break;
      case 2:
        this.sideList = 2;
        this.title = "Profile"
    }
    console.log(this.sideList)
  }
}
