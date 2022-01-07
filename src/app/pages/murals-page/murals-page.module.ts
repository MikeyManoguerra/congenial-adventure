import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuralsPageRoutingModule } from './murals-page-routing.module';
import { MuralsPageComponent } from './murals-page.component';
import { MuralComponent } from './mural/mural.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MuralsPageComponent,
    MuralComponent,
  
  ],
  imports: [
    SharedModule,
    ScullyLibModule,
    CommonModule,
    MuralsPageRoutingModule
  ]
})
export class MuralsPageModule { }
