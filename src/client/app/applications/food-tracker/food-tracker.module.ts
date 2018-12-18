// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';

// Components
import { FoodLandingComponent } from './components/food-landing/food-landing.component'
import { FoodSubNavComponent } from './components/food-sub-nav/food-sub-nav.component';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux Store
import { store } from '../../redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';

@NgModule({
  declarations: [
    FoodLandingComponent,
    FoodSubNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: FoodLandingComponent }
    ])
  ],
  providers: [
    FoodLandingComponent
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FoodTrackerModule {
  constructor(ngRedux: NgRedux<GlobalState>) {
    ngRedux.provideStore(store);
  }
 }
