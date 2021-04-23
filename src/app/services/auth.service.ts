import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn: boolean = false;

  public login(isValid: boolean){
    if(isValid){
      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? "true" : "false")
    }
  }
}
