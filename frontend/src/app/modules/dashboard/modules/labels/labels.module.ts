import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelsRoutingModule } from './labels-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditFormComponent, LabelComponent, DashboardComponent } from './components';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Filter } from './pipes';

const icons: IconDefinition[] = [
  EditOutline,
  DeleteOutline,
  SearchOutline
];

@NgModule({
  declarations: [
    DashboardComponent,
    LabelComponent,
    EditFormComponent,
    Filter
  ],
  imports: [
    CommonModule,
    LabelsRoutingModule,
    NzIconModule.forChild(icons),
    ColorPickerModule,
    SharedModule
  ],
})
export class LabelsModule {}
