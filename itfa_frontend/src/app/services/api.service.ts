import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, isDevMode, NgZone } from '@angular/core';
import { NEVER, Observable, Subject, firstValueFrom, from, lastValueFrom, map, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Env } from '../interfaces/env';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient,private authService : AuthService, private router: Router, private snackbar: MatSnackBar,private zone: NgZone) { }
  private envUrl = isDevMode() ? "assets/data/config-dev.json" : "assets/data/config.json";
  private env: Env = { BACKEND_URL: 'http://127.0.0.1:8000/', DEBUG: false };


  /**
  |--------------------------------------------------------------------------
  | Requests
  |--------------------------------------------------------------------------
  **/
  public getRequest(uri: string, responseType: any = "json",includeToken:boolean=true): Observable<any> {
    if (responseType) {
      if (includeToken) {
      const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
      return this.http.get(this.env.BACKEND_URL + uri, { headers, responseType: responseType });
      } else {
      return this.http.get(this.env.BACKEND_URL + uri, { responseType: responseType });
      }
    } else {
      if (includeToken) {
      const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
      return this.http.get(this.env.BACKEND_URL + uri, { headers });
      } else {
      return this.http.get(this.env.BACKEND_URL + uri);
      }
    }
  }

  public postRequest(uri: string, postData: any, responseType: any = 'json',includeToken:boolean=true) {
    if (responseType) {
      if (includeToken) {
      const headers = { Authorization: `Token ${this.authService.getToken()}` };
      return this.http.post(this.env.BACKEND_URL + uri, postData, { headers, responseType: responseType, withCredentials: false });
      } else {
      return this.http.post(this.env.BACKEND_URL + uri, postData, { responseType: responseType, withCredentials: false });
      }
    } else {
      if (includeToken) {
      const headers = { Authorization: `Token ${this.authService.getToken()}` };
      return this.http.post(this.env.BACKEND_URL + uri, postData, { headers, withCredentials: false });
      } else {
      return this.http.post(this.env.BACKEND_URL + uri, postData, { withCredentials: false });
      }
    }
  }

  public putRequest(uri: string, putData: any, includeToken:boolean=true) {
    if (includeToken) {
      const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
      return this.http.put(this.env.BACKEND_URL + uri, putData, { headers });
    } else {
      return this.http.put(this.env.BACKEND_URL + uri, putData);
    }
  }

  public patchRequest(uri: string, patchData: any, includeToken:boolean=true) {
    if (includeToken) {
      const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
      return this.http.patch(this.env.BACKEND_URL + uri, patchData, { headers });
    } else {
      return this.http.patch(this.env.BACKEND_URL + uri, patchData);
    }
  }

  /**
  |--------------------------------------------------------------------------
  | Response
  |--------------------------------------------------------------------------
  **/

  public handleError(error: any) {
    this.zone.run(() => {
        if (error.status == 401 || error.status == 0) { // Unauthorized or no communication with backend
            this.snackbar.open('An error occurred: ' + error.error.message, 'OK',{
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
              });
        }
        else if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.snackbar.open('An error occurred: ' + error.error.message, 'OK',{
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.snackbar.open(`Backend returned code ${error.status}, ` + `body was: ${error.error.message}`, 'OK');
        }
    });
    
    // return an observable with a user-facing error message
    //this.snackbar.open(error.error.detail, 'OK');
  }

  public unAuthorized() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_timestamp');
    localStorage.removeItem('refresh_timestamp');

    this.router.navigate(['/login'], {
      queryParams: {
        return: window.location.pathname == '/login' ? '/' : window.location.pathname
      }
    });
  }

  /**
  |--------------------------------------------------------------------------
  | ENV
  |--------------------------------------------------------------------------
  **/
  public initializeEnv(): Observable<Env> {
    const res = new Subject<Env>();
    if (this.env.BACKEND_URL != '') {
      res.next(this.env);
    } else {
      this.http.get(this.envUrl).subscribe(response => {
        res.next(<Env>response);
      });
    }
    return res;
  }

  get getEnv(): Env {
    return this.env;
  }

  public setEnv(env: Env) {
    this.env = env;
  }

  get getApiUrl() {
    return this.env.BACKEND_URL;
  }

  get timeNow(): number {
    return Math.floor(Date.now() / 1000);
  }
}