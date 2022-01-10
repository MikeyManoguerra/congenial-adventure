import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ChipCardComponent } from './components/chip-card/chip-card.component';
import { TheMapComponent } from './components/the-map/the-map.component';
import { TheLayoutComponent } from './components/the-layout/the-layout.component';



@NgModule({
  declarations: [
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent,
    TheLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent,
    TheLayoutComponent
  ]
})
export class SharedModule { }
