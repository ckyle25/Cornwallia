// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';

// Components
import { WishesLandingComponent } from './components/wishes-landing/wishes-landing.component';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { WishesSubNavComponent } from './components/wishes-sub-nav/wishes-sub-nav.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllWishesComponent } from './components/all-wishes/all-wishes.component';


@NgModule({
  declarations: [
    WishesLandingComponent,
    WishesSubNavComponent,
    HowToUseComponent,
    WishListComponent,
    AllWishesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: WishesLandingComponent,  children: [
        { path: '', redirectTo:'howto', pathMatch: 'full'},
        { path: 'howto', component: HowToUseComponent},
        { path: 'wishlist', component: WishListComponent},
        { path: 'allwishes', component: AllWishesComponent}
      ]},
    ])
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WishesModule { }
