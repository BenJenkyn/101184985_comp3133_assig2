import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = true;
  test = false;
  displayedColumns: string[] = [
    'hotel_id',
    'booking_date',
    'booking_start',
    'booking_end',
    'user_id'
  ];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            getBooking {
              hotel_id
              booking_date
              booking_start
              booking_end
              user_id
            }
          }
        `,
      })
      .subscribe(({ data, loading }) => {
        this.bookings = data && data.getBooking;
        this.loading = loading;
      });
  }

  getHotelName(getBooking: any[]) {
    if (getBooking.length > 1) {
      return getBooking.reduce((acc, cur) => acc.name + ', ' + cur.name);
    } else {
      return getBooking[0].name;
    }
  }
}
