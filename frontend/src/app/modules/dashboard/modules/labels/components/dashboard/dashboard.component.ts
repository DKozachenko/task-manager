import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LabelQuery } from '../../store/label.query';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../store';
import { ILabelFilter, ILabelForDashboard } from '../../models/interfaces';
import { BaseDashboardComponent } from 'src/app/modules/shared/classes';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'labels-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseDashboardComponent<
  ILabelForDashboard,
  ILabelFilter,
  LabelService,
  LabelQuery
> {
  constructor(
    private readonly labelService: LabelService,
    private readonly labelQuery: LabelQuery,
    public override readonly notificationService: NzNotificationService
  ) {
    super(labelService, labelQuery, notificationService);

    this.searchForm = new FormGroup({
      name: new FormControl(undefined)
    });
  }
}
