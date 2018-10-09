// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';;
import { CommonModule } from '@angular/common';

// Components
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { LandingSubNavBarComponent } from '../components/landing-sub-nav-bar/landing-sub-nav-bar.component';
import { ModalTemplateComponent } from '../shared/modal-template/modal-template.component';
import { AppLoadingComponent } from '../components/app-loading/app-loading.component';


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
export class SharedModule { }
