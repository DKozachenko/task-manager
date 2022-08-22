import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzToolTipModule,
    NzNotificationModule,
    NzModalModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzTagModule,
    NzSpinModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzToolTipModule,
    NzNotificationModule,
    NzModalModule,
  ],
})
export class SharedModule {}
