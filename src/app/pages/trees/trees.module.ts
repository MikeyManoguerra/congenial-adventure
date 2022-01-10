import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreesRoutingModule } from './trees-routing.module';
import { TreesComponent } from './trees.component';


@NgModule({
  declarations: [
    TreesComponent,
  ],
  imports: [
    CommonModule,
    TreesRoutingModule
  ]
})
export class TreesModule { }
