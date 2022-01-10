import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesComponent } from './species.component';
import { ScullyLibModule } from '@scullyio/ng-lib';


@NgModule({
  declarations: [
    SpeciesComponent
  ],
  imports: [
    CommonModule,
    ScullyLibModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
