import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseDashboardComponent } from 'src/app/modules/shared/classes';
import { LabelService } from '../../../labels/store';
import { ITaskForDashboard, ITaskFilter } from '../../models/interfaces';
import { TaskQuery, TaskService } from '../../store';
import { ILabelDto, IResponse } from 'src/app/modules/shared/models/interfaces';

/**
 * Компонент дашборда задач
 */
@UntilDestroy()
@Component({
  selector: 'tasks-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseDashboardComponent<
  ITaskForDashboard,
  ITaskFilter,
  TaskService,
  TaskQuery
> {
  public allLabels$: Observable<IResponse<ILabelDto[]>> = this.labelService.getAll();

  constructor(
    private readonly taskService: TaskService,
    private readonly taskQuery: TaskQuery,
    public override readonly notificationService: NzNotificationService,
    private readonly labelService: LabelService
  ) {
    super(taskService, taskQuery, notificationService);

    this.searchForm = new FormGroup({
      name: new FormControl(undefined),
      labelIds: new FormControl([])
    });
  }
}
