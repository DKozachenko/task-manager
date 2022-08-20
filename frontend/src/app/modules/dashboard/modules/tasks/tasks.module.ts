import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TasksRoutingModule } from './tasks-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { EditFormComponent, TaskComponent, TasksComponent } from './components';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const icons: IconDefinition[] = [
  EditOutline,
  DeleteOutline
];

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TasksRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzSpinModule,
  ],
})
export class TasksModule {}
