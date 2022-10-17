import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { Error404Component } from './pages/error404/error404.component';
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [

  // path: /dashboard routes from pagesRoutingModule
  // path: /auth routes from authRoutingModule


  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'error404', component:Error404Component},
  {path: '**', redirectTo: 'error404'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
