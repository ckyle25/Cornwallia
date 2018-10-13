// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';

// Components
import { WishesLandingComponent } from './components/wishes-landing/wishes-landing.component';
import { WishesSubNavComponent } from './components/wishes-sub-nav/wishes-sub-nav.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllWishesComponent } from './components/all-wishes/all-wishes.component';
import { FilterCardComponent } from './components/filter-card/filter-card.component';
import { RobShariComponent } from './components/rob-shari/rob-shari.component';
import { KyleJodiComponent } from './components/kyle-jodi/kyle-jodi.component';
import { KevinKendalComponent } from './components/kevin-kendal/kevin-kendal.component';
import { TroyAlisonComponent } from './components/troy-alison/troy-alison.component';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux Store
import { store } from '../../redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { WishCardComponent } from './components/wish-card/wish-card.component';
import { MyWishesComponent } from './components/my-wishes/my-wishes.component';


@NgModule({
  declarations: [
    WishesLandingComponent,
    WishesSubNavComponent,
    HowToUseComponent,
    WishListComponent,
    AllWishesComponent,
    FilterCardComponent,
    RobShariComponent,
    KyleJodiComponent,
    KevinKendalComponent,
    TroyAlisonComponent,
    WishCardComponent,
    MyWishesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: WishesLandingComponent,  children: [
        { path: '', redirectTo: 'howto', pathMatch: 'full'},
        { path: 'howto', component: HowToUseComponent},
        { path: 'mywishes', component: MyWishesComponent},
        { path: 'wishlist', component: WishListComponent},
        { path: 'allwishes', component: AllWishesComponent, children: [
          { path: '', redirectTo: 'allwishes', pathMatch: 'full'},
          { path: 'kylejodi', component: KyleJodiComponent},
          { path: 'kevinkendal', component: KevinKendalComponent},
          { path: 'robshari', component: RobShariComponent},
          { path: 'troyalison', component: TroyAlisonComponent}
        ]}
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
