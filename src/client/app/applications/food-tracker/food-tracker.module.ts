// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material';

// Components
import { FoodLandingComponent } from './components/food-landing/food-landing.component';
import { FoodSubNavComponent } from './components/food-sub-nav/food-sub-nav.component';
import { FoodItemOverviewComponent } from './components/food-item-overview/food-item-overview.component';
import { FoodHomeComponent } from './components/food-home/food-home.component';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux Store
import { store } from '../../redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';
import { LocationCardComponent } from './components/location-card/location-card.component';

@NgModule({
  declarations: [
    FoodLandingComponent,
    FoodSubNavComponent,
    LocationCardComponent,
    FoodItemOverviewComponent,
    FoodHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: FoodLandingComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: FoodHomeComponent},
        { path: 'overview', component: FoodItemOverviewComponent}
      ]},
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
