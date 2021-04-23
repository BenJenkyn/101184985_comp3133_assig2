import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels: any[] = [];

  displayedColumns: string[] = [
    'hotel_name',
    'street',
    'city',
    'postal_code',
    'price',
    'email',
    'add_booking',
  ];

  dataSource = new MatTableDataSource(this.hotels);
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            getHotels {
              hotel_name
              street
              city
              postal_code
              price
              email
            }
          }
        `,
      })
      .subscribe(({data}) => {
        this.hotels = data && data.getHotels;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
