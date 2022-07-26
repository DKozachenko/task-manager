import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { TuiInputModule, TuiInputPasswordModule, TuiTabsModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiTabsModule,
    TuiInputModule,
    TuiButtonModule
  ]
})
export class AuthorizationModule { }
