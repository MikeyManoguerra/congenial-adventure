import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesListRoutingModule } from './species-list-routing.module';
import { SpeciesListComponent } from './species-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpeciesListComponent
  ],
  imports: [
    CommonModule,
    SpeciesListRoutingModule,
    SharedModule
  ]
})
export class SpeciesListModule { }
