import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any

  constructor() { }
  isLoggedIn: boolean = false;

  public login(isValid: boolean, user: any){
    if(isValid){
      this.isLoggedIn = true
      localStorage.setItem('user_id', user._id)
      localStorage.setItem('username', user.username)
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? "true" : "false")
    }
  }
}
