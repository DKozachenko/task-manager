import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { SharedModule } from '../shared/shared.module';

const icons: IconDefinition[] = [PlusOutline];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzIconModule.forChild(icons),
    SharedModule
  ],
})
export class DashboardModule {}
