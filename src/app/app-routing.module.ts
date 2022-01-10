import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  { path: 'trees', loadChildren: () => import('./pages/trees/trees.module').then(m => m.TreesModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule) },
  { path: 'about', loadChildren: () => import('./pages/about-page/about-page.module').then(m => m.AboutPageModule) },
  { path: 'murals', loadChildren: () => import('./pages/murals-page/murals-page.module').then(m => m.MuralsPageModule) },
  { path: 'species', loadChildren: () => import('./pages/species-list/species-list.module').then(m => m.SpeciesListModule) },
  { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
