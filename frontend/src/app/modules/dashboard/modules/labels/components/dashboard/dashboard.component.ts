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
export class DashboardComponent extends BaseDashboardComponent<ILabelForDashboard, LabelQuery> {
  constructor(
    private readonly labelService: LabelService,
    private readonly labelQuery: LabelQuery,
    private readonly notificationService: NzNotificationService
  ) {
    super(labelQuery);
  }

  /** Функция получения данных */
  public reload(): void {
    this.isLoading = true;

    this.labelService
      .getAllForDashboard()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.notificationService.error(
            'Ошибка',
            'Ошибка при получении всех записей'
          );
          return of([]);
        }),
        untilDestroyed(this)
      )
      .subscribe((data: ILabelForDashboard[]) => {
        this.dataForDashboard = data;
        this.isLoading = false;
      });
  }
}
