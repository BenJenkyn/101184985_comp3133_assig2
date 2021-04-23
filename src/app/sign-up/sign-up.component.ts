import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  users: any[] = [];

  constructor(private apollo: Apollo) { }
//TODO
  ngOnInit(): void {
      this.apollo
        .query<any>({
          query: gql`
            {
              addUser(){

              }
            }
          `,
        })
        .subscribe(({data}) => {
          this.users = data && data.getUsers;
        });
  }

  getErrorMessage(){
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
