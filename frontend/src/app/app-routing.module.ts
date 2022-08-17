import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
