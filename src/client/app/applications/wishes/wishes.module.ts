// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';

// Components
import { WishesLandingComponent } from './components/wishes-landing/wishes-landing.component';
import { WishesSubNavComponent } from './components/wishes-sub-nav/wishes-sub-nav.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllWishesComponent } from './components/all-wishes/all-wishes.component';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux Store
import { store } from '../../redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { FilterCardComponent } from './components/filter-card/filter-card.component';

@NgModule({
  declarations: [
    WishesLandingComponent,
    WishesSubNavComponent,
    HowToUseComponent,
    WishListComponent,
    AllWishesComponent,
    FilterCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: WishesLandingComponent,  children: [
        { path: '', redirectTo: 'howto', pathMatch: 'full'},
        { path: 'howto', component: HowToUseComponent},
        { path: 'wishlist', component: WishListComponent},
        { path: 'allwishes', component: AllWishesComponent}
      ]},
    ])
  ],
  providers: [
    WishesLandingComponent
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WishesModule {
  constructor(ngRedux: NgRedux<GlobalState>) {
    ngRedux.provideStore(store);
  }
 }
