import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, public auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const isLoggedIn = this.auth.isAuthenticated();

        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['login']);
            alert('Please Login');
            return false;
        }
    }
}


