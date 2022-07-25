import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { TuiTabsModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    TuiTabsModule
  ]
})
export class AuthorizationModule { }
