import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OverlayModule } from '@angular/cdk/overlay';

const icons: IconDefinition[] = [PlusOutline];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
  ],
  providers: [NzModalService],
})
export class DashboardModule {}
