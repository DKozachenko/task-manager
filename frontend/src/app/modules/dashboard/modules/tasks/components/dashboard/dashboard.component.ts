import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseDashboardComponent } from 'src/app/modules/shared/classes';
import { ITaskForDashboard } from '../../models/interfaces';
import { TaskQuery, TaskService } from '../../store';

@UntilDestroy()
@Component({
  selector: 'tasks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent extends BaseDashboardComponent
  <ITaskForDashboard, TaskService, TaskQuery> {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskQuery: TaskQuery,
    public override readonly notificationService: NzNotificationService
  ) {
    super(taskService, taskQuery, notificationService);
  }
}
