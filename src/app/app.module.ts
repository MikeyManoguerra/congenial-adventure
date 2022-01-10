import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TheFooterComponent } from './components/the-footer/the-footer.component';
import { TheHeaderComponent } from './components/the-header/the-header.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    TheFooterComponent,
    TheHeaderComponent,
    PlaceholderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    SharedModule
  ],
  providers: [ { provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
