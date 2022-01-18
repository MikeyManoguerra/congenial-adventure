import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxRoutingModule } from './sandbox-routing.module';
import { SandboxComponent } from './sandbox.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SandboxComponent
  ],
  imports: [
    CommonModule,
    SandboxRoutingModule,
    SharedModule
  ]
})
export class SandboxModule { }
