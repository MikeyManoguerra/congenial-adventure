import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuralsPageComponent } from './murals-page.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component: MuralsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuralsPageRoutingModule { }
