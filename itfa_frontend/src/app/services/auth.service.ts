import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string = '';

  public getToken() {
    return this.token;
  }

  constructor(private router: Router) {
    this.token = localStorage.getItem('token') || '';
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public login(data: any) {}

  public logout() {
  localStorage.removeItem('token');
  this.token = '';
  this.router.navigate(['/login']);
  }

  public redirectToRegister() {
    this.router.navigate(['/register']);
  }

  public redirectToLogin() {
    this.router.navigate(['/login']);
  }

  public redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
