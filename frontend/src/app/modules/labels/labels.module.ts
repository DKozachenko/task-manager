import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelsComponent } from './components/labels/labels.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LabelsRoutingModule } from './labels-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { LabelComponent } from './components/label/label.component';

const icons: IconDefinition[] = [
  EditOutline,
  DeleteOutline
];

@NgModule({
  declarations: [LabelsComponent, LabelComponent],
  imports: [
    CommonModule,
    LabelsRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzCardModule,
  ],
})
export class LabelsModule {}
