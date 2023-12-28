import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginForm: FormGroup | any;

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if user is already logged in (you can implement your own logic here)
    const isLoggedIn = this.checkLoggedInStatus();
    this.isLoggedInSubject.next(isLoggedIn);
  }

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // Set the logged-in status to false
    this.isLoggedInSubject.next(false);
  }

  private checkLoggedInStatus(): boolean {
    const registrationDataString = sessionStorage.getItem('registrationData');
    const registrationData = registrationDataString ? JSON.parse(registrationDataString) : null;
    console.log('Sameer => 33',registrationData);
    const isLoggedIn = !!registrationData;    // (!!) to convert the registrationData into a boolean value

    return isLoggedIn;
  }




}

