import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    CommonModule,
    ScullyLibModule,
    TreeRoutingModule,
    SharedModule
  ]
})
export class TreeModule { }
