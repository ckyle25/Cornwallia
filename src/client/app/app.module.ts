// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { RequestAccessComponent } from './components/request-access/request-access.component';
import { LeaveFeedbackComponent } from './components/leave-feedback/leave-feedback.component';

// Services
import { AuthGuardService } from './services/auth/authGuard-service';

// Modules
import { SharedModule } from './shared/shared.module';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux
import { store } from './redux/store';
import { IGlobalState as GlobalState } from './redux/rootReducer';
import { SharedActionCreators } from './redux/shared/sharedReducer';
import { SharedService } from './services/shared/sharedServices';
import { WishesActionCreators } from './redux/wishes/wishesRootReducer';
import { WishesService } from './services/wishes/wishesService';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingComponent,
    CallbackComponent,
    HomeCarouselComponent,
    AppCardComponent,
    AppListComponent,
    RequestAccessComponent,
    LeaveFeedbackComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NgReduxModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      // { path: 'loading', component: AppLoadingComponent, canActivate: [AuthGuardService] },
      { path: 'home', component: LandingComponent, canActivate: [AuthGuardService], children: [
        { path: '', redirectTo: 'apps', pathMatch: 'full', canActivate: [AuthGuardService] },
        { path: 'apps', component: AppListComponent, canActivate: [AuthGuardService] },
        { path: 'access', component: RequestAccessComponent, canActivate: [AuthGuardService] },
        { path: 'feedback', component: LeaveFeedbackComponent, canActivate: [AuthGuardService] }
      ]},
      { path: 'wishes', loadChildren: './applications/wishes/wishes.module#WishesModule', canActivate: [AuthGuardService]},
      { path: 'shared', loadChildren: './shared/shared.module#SharedModule', canActivate: [AuthGuardService]},
      { path: 'lanparty', loadChildren: './applications/lan-party-planner/lan-party-planner.module#LanPartyModule', canActivate: [AuthGuardService]}
    ], {useHash: true})
  ],
  providers: [
    AuthGuardService,
    LandingComponent,
    SharedActionCreators,
    SharedService,
    WishesActionCreators,
    WishesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<GlobalState>) {
      ngRedux.provideStore(store);
    }
 }
