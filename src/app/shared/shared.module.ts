import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ChipCardComponent } from './components/chip-card/chip-card.component';



@NgModule({
  declarations: [
    PrimaryCardComponent,
    ChipCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrimaryCardComponent,
    ChipCardComponent
  ]
})
export class SharedModule { }
