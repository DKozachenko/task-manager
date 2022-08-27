import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseDashboardComponent } from 'src/app/modules/shared/classes';
import { ITaskForDashboard, ITaskFilter } from '../../models/interfaces';
import { TaskQuery, TaskService } from '../../store';

@UntilDestroy()
@Component({
  selector: 'tasks-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseDashboardComponent<
  ITaskForDashboard,
  TaskService,
  TaskQuery,
  ITaskFilter
> {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskQuery: TaskQuery,
    public override readonly notificationService: NzNotificationService
  ) {
    super(taskService, taskQuery, notificationService);

    this.searchForm = new FormGroup({
      name: new FormControl(undefined)
    });
  }
}
