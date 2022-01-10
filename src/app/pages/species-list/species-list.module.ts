import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesListRoutingModule } from './species-list-routing.module';
import { SpeciesListComponent } from './species-list.component';


@NgModule({
  declarations: [
    SpeciesListComponent
  ],
  imports: [
    CommonModule,
    SpeciesListRoutingModule
  ]
})
export class SpeciesListModule { }
