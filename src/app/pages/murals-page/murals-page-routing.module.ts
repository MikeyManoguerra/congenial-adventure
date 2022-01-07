import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuralComponent } from './mural/mural.component';
import { MuralsPageComponent } from './murals-page.component';

const routes: Routes = [
  {path:':postId', component: MuralComponent},
  {path:'', component: MuralsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuralsPageRoutingModule { }
