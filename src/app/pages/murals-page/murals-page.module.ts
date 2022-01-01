import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuralsPageRoutingModule } from './murals-page-routing.module';
import { MuralsPageComponent } from './murals-page.component';


@NgModule({
  declarations: [
    MuralsPageComponent
  ],
  imports: [
    CommonModule,
    MuralsPageRoutingModule
  ]
})
export class MuralsPageModule { }
