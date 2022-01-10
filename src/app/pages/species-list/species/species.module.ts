import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesComponent } from './species.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpeciesComponent
  ],
  imports: [
    CommonModule,
    ScullyLibModule,
    SpeciesRoutingModule,
    SharedModule
  ]
})
export class SpeciesModule { }
