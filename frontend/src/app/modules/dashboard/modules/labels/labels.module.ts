import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LabelsRoutingModule } from './labels-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditFormComponent, LabelComponent, DashboardComponent } from './components';

const icons: IconDefinition[] = [
  EditOutline,
  DeleteOutline
];

@NgModule({
  declarations: [
    DashboardComponent,
    LabelComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LabelsRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ColorPickerModule,
    NzSpinModule
  ],
})
export class LabelsModule {}
