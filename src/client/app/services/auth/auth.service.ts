// import { Injectable } from '@angular/core';
// import { AUTH_CONFIG } from './auth0-variables';
// import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import * as auth0 from 'auth0-js';
// import axios from 'axios';

// (window as any).global = window;

// @Injectable()
// export class AuthService {

//   constructor(public router: Router) {
//   }

//   public login(): void {
//     axios.get(`${environment.apiUrl}/authConfig`)
//       .then(res => {
//         const auth0var = new auth0.WebAuth({
//           clientID: res.data.clientID,
//           domain: res.data.domain,
//           responseType: 'token id_token',
//           redirectUri: res.data.callbackUrl
//         });

//         auth0var.authorize();
//       });
//   }

//   public handleAuthentication(): void {

//     axios.get(`${environment.apiUrl}/authConfig`)
//     .then(res => {
//       const auth0var = new auth0.WebAuth({
//         clientID: res.data.clientID,
//         domain: res.data.domain,
//         responseType: 'token id_token',
//         redirectUri: res.data.callbackUrl
//       });

//       auth0var.parseHash((err, authResult) => {
//         if (authResult && authResult.accessToken && authResult.idToken) {
//           this.setSession(authResult);
//           this.router.navigate(['home']);
//         } else if (err) {
//           this.router.navigate(['login']);
//           console.log(err);
//           alert(`Error: ${err.error}. Check the console for further details.`);
//         }
//       });
//     });
//   }

//   private setSession(authResult): void {
//     // Set the time that the access token will expire at
//     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//   }

//   public logout(): void {
//     // Remove tokens and expiry time from localStorage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // Go back to the home route
//     this.router.navigate(['/']);
//   }

//   public isAuthenticated(): boolean {
//     // Check whether the current time is past the
//     // access token's expiry time
//     const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
//     return new Date().getTime() < expiresAt;
//   }

// }
