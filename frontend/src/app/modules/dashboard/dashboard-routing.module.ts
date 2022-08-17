import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components';

const routes: Routes = [
  {
    path: 'tasks',
    component: LayoutComponent,
    loadChildren: () =>
      import('../tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'labels',
    component: LayoutComponent,
    loadChildren: () =>
      import('../labels/labels.module').then((m) => m.LabelsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
