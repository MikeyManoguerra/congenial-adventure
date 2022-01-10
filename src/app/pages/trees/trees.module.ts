import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreesRoutingModule } from './trees-routing.module';
import { TreesComponent } from './trees.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TreesComponent,
  ],
  imports: [
    CommonModule,
    TreesRoutingModule,
    SharedModule
  ]
})
export class TreesModule { }
