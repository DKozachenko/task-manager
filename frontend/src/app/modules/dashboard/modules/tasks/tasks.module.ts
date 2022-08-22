import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { EditFormComponent, TaskComponent, DashboardComponent } from './components';
import { SharedModule } from 'src/app/modules/shared/shared.module';
const icons: IconDefinition[] = [
  EditOutline,
  DeleteOutline
];

@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NzIconModule.forChild(icons),
    SharedModule
  ],
})
export class TasksModule {}
