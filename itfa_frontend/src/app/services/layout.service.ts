import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  public isMobile$ = this.breakpointObserver.observe(`(max-width: 599px)`).pipe(map(state => state.matches));
}