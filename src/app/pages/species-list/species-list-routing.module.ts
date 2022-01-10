import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesListComponent } from './species-list.component';

const routes: Routes = [
  { path: ':slug', loadChildren: () => import('./species/species.module').then(m => m.SpeciesModule) },
  { path: '', component: SpeciesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesListRoutingModule { }
