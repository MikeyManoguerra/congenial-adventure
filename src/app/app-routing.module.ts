import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  { path:'about', loadChildren: () => import('./pages/about-page/about-page.module').then(m => m.AboutPageModule)},
  { path:'murals', loadChildren: () => import('./pages/murals-page/murals-page.module').then(m => m.MuralsPageModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
