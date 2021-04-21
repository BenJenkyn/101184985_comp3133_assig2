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
  loading = true;
  test = false
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
            getHotel {
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
      .subscribe(({ data, loading }) => {
        this.hotels = data && data.getHotel;
        this.loading = loading;
      });
    console.log('test' + this.hotels);
  }

  getHotelName(hotelNames: any[]) {
    if (hotelNames.length > 1) {
      return hotelNames.reduce((acc, cur) => acc.name + ', ' + cur.name);
    } else {
      return hotelNames[0].name;
    }
  }
}
