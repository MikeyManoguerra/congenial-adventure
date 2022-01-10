import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutPageComponent } from './about-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AboutPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AboutPageRoutingModule
  ]
})
export class AboutPageModule { }
