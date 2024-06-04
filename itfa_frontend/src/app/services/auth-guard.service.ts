import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
 
 
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
    constructor(private router:Router,private authService: AuthService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean | UrlTree {
        //return true; FOR DEBUG
        if (!this.authService.token) {
            //redirect to login
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
 
}