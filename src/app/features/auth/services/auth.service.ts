import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Observable to track login state
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(username: string, password: string): boolean {

    if (username === 'demo' && password === 'password') {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

   logout(): void {
    this.isLoggedInSubject.next(false);
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
}
