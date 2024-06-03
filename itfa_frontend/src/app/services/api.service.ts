import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, isDevMode, NgZone } from '@angular/core';
import { NEVER, Observable, Subject, firstValueFrom, from, lastValueFrom, map, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Env } from '../interfaces/env';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar,private zone: NgZone) { }
  private envUrl = isDevMode() ? "assets/data/config-dev.json" : "assets/data/config.json";
  private env: Env = { BACKEND_URL: '', DEBUG: false };


  /**
  |--------------------------------------------------------------------------
  | Requests
  |--------------------------------------------------------------------------
  **/
  public getRequest(uri: string, responseType: any = ""): Observable<any> {
    if (responseType) {
      return this.http.get(this.env.BACKEND_URL + uri, { responseType: responseType });
    } else {
      return this.http.get(this.env.BACKEND_URL + uri);
    }
  }

  public postRequest(uri: string, postData: any, responseType: any = 'json') {
    if (responseType) {
      return this.http.post(this.env.BACKEND_URL + uri, postData, { responseType: responseType ,withCredentials: true });
    } else {
      return this.http.post(this.env.BACKEND_URL + uri, postData);
    }
  }

  public putRequest(uri: string, postData: any) {
    return this.http.put(this.env.BACKEND_URL + uri, postData);
  }

  public patchRequest(uri: string, postData: any) {
    return this.http.patch(this.env.BACKEND_URL + uri, postData);
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