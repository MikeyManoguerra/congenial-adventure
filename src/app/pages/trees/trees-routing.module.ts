import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreesComponent } from './trees.component';

const routes: Routes = [
  { path: ':slug', loadChildren: () => import('./tree/tree.module').then(m => m.TreeModule) },
  { path: '', component: TreesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreesRoutingModule { }
