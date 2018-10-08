import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';


@Injectable()
export class AuthGuardService implements CanActivate {
    isLoggedIn: any;

    constructor(private router: Router) { }

    canActivate() {
    return axios.get(`${environment.serverUrl}auth/me`)
          .then(res => {
            this.isLoggedIn = res.data;
            console.log('user', res.data)

            if (res.data !== 'Login Required') {
                return true;
            } else {
                this.router.navigate(['login']);
                alert('Please Login');
                return false;
            }
          });
    }
}


