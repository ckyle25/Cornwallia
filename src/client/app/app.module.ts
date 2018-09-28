// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { CallbackComponent } from './components/callback/callback.component';

// Services
import { AuthGuardService } from './services/auth/authGuard-service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { LandingSubNavBarComponent } from './components/landing-sub-nav-bar/landing-sub-nav-bar.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { RequestAccessComponent } from './components/request-access/request-access.component';
import { LeaveFeedbackComponent } from './components/leave-feedback/leave-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingComponent,
    CallbackComponent,
    NavBarComponent,
    HomeCarouselComponent,
    AppCardComponent,
    LandingSubNavBarComponent,
    AppListComponent,
    RequestAccessComponent,
    LeaveFeedbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'home', component: LandingComponent, canActivate: [AuthGuardService], children: [
        { path: '', redirectTo: 'apps', pathMatch: 'full', canActivate: [AuthGuardService] },
        { path: 'apps', component: AppListComponent, canActivate: [AuthGuardService] },
        { path: 'access', component: RequestAccessComponent, canActivate: [AuthGuardService] },
        { path: 'feedback', component: LeaveFeedbackComponent, canActivate: [AuthGuardService] }
      ]},
    ], {useHash: true})
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
