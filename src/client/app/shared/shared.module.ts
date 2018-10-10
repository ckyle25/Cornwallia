// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

// Components
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { LandingSubNavBarComponent } from '../components/landing-sub-nav-bar/landing-sub-nav-bar.component';
import { ModalTemplateComponent } from '../shared/modal-template/modal-template.component';
import { AppLoadingComponent } from '../components/app-loading/app-loading.component';

// Modules
import { NgRedux, NgReduxModule } from 'ng2-redux';

// Redux Store
import { store } from '../redux/store';
import { IGlobalState as GlobalState } from '../redux/rootReducer';

@NgModule({
  declarations: [
    NavBarComponent,
    LandingSubNavBarComponent,
    ModalTemplateComponent,
    AppLoadingComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    NgReduxModule,
    RouterModule.forChild([
        { path: 'loading', component: AppLoadingComponent },
      ])
  ],
  exports: [
    NavBarComponent,
    ModalTemplateComponent,
    LandingSubNavBarComponent,
    AppLoadingComponent
  ],
  providers: [ModalTemplateComponent],
})
export class SharedModule {

}
