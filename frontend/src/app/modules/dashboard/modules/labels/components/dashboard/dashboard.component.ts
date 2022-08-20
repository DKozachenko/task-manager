import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LabelQuery } from '../../store/label.query';
import { catchError, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityAction, EntityActions } from '@datorama/akita';
import { ILabelForDashboard } from '../../models/interfaces';
import { BaseDashboardComponent } from 'src/app/modules/shared/classes';

@Component({
  selector: 'labels-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BaseDashboardComponent
  <ILabelForDashboard, LabelService, LabelQuery> {
  constructor(
    private readonly labelService: LabelService,
    private readonly labelQuery: LabelQuery,
    public override readonly notificationService: NzNotificationService
  ) {
    super(labelService, labelQuery, notificationService);
  }
}
