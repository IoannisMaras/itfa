import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators'
import { ApiService } from './api.service';
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public token: string = '';

  constructor(private router:Router,private apiService : ApiService) {
    this.token = localStorage.getItem('token') || '';
   
    }

    public setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

  public login(data: any) {
    
  }

public redirectToRegister() {
    this.router.navigate(['/register']);
}

public redirectToDashboard() {
    this.router.navigate(['/dashboard']);
}
}