// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, ChildrenOutletContexts } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { WishesLandingComponent } from './components/wishes-landing/wishes-landing.component';


@NgModule({
  declarations: [
    WishesLandingComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: WishesLandingComponent },
    ])
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WishesModule { }
