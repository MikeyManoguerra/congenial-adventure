import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { ScullyLibModule } from '@scullyio/ng-lib';


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    CommonModule,
    ScullyLibModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
