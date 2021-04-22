import { Component, OnInit } from '@angular/core';
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
    'user_id',
    'add_booking',
  ];
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
              user_id
            }
          }
        `,
      })
      .subscribe(({ data}) => {
        this.hotels = data && data.getHotels;
      });
  }
}
