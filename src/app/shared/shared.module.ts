import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ChipCardComponent } from './components/chip-card/chip-card.component';
import { TheMapComponent } from './components/the-map/the-map.component';
import { TheLayoutComponent } from './components/the-layout/the-layout.component';
import { WindowCardComponent } from './components/window-card/window-card.component';
import { FormatPipe } from './pipes/format.pipe';
import { FocusHoverDirective } from './directives/focus-hover.directive';
import { PopupComponent } from './components/popup/popup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent,
    TheLayoutComponent,
    WindowCardComponent,
    FormatPipe,
    FocusHoverDirective,
    PopupComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    PrimaryCardComponent,
    ChipCardComponent,
    TheMapComponent,
    TheLayoutComponent,
    WindowCardComponent,
    FocusHoverDirective,
    PopupComponent
  ]
})
export class SharedModule { }
