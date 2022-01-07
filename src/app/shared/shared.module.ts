import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ChipCardComponent } from './components/chip-card/chip-card.component';
import { TheMapComponent } from './components/the-map/the-map.component';



@NgModule({
  declarations: [
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent
  ]
})
export class SharedModule { }
