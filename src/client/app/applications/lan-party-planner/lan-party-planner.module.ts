// Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';

// Components
import { LanLandingComponent } from './components/lan-landing/lan-landing.component'
import { LanSubNavComponent } from './components/lan-sub-nav/lan-sub-nav.component';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';

// Redux Store
import { store } from '../../redux/store';
import { IGlobalState as GlobalState } from '../../redux/rootReducer';

@NgModule({
  declarations: [
    LanLandingComponent,
    LanSubNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LanLandingComponent }
    ])
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LanPartyModule {
  constructor(ngRedux: NgRedux<GlobalState>) {
    ngRedux.provideStore(store);
  }
 }
