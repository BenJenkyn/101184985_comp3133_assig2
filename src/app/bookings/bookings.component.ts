import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  dataSource = new MatTableDataSource(this.bookings)

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
            getBookings {
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
        this.bookings = data && data.getBookings;
        this.loading = loading;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
