import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const q = gql `
query GetLogin($username: String!, $password: String!){
    getLogin(username: $username, password: $password)
    {
      _id
      username
      email
    }
  }
`;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  user: any

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    const unm = form.value.usernameInput
    const pwd = form.value.passwordInput

    console.log(unm + " " + pwd)
    this.apollo
      .query<any>({
        query: q,
        variables: {
          username: unm,
          password: pwd
        }
      })
      .subscribe(({ data }) => {
        // this.user = data && data.getLogin;
        console.log(data)
      });
    console.log(form.value)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
