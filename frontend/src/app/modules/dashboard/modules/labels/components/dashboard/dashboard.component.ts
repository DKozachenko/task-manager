import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LabelQuery } from '../../store/label.query';
import { catchError, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityAction, EntityActions } from '@datorama/akita';
import { ILabelForDashboard } from '../../models/interfaces';

@UntilDestroy()
@Component({
  selector: 'labels-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  public labelsForDashboard: ILabelForDashboard[] = [];

  public isLoading: boolean = false;

  constructor(
    private readonly labelService: LabelService,
    private readonly labelQuery: LabelQuery,
    private readonly notificationService: NzNotificationService
  ) {}

  public ngOnInit(): void {
    this.reload();

    this.labelQuery
      .selectEntityAction([
        EntityActions.Add,
        EntityActions.Update,
        EntityActions.Remove,
      ])
      .subscribe((action: EntityAction<string>) => {
        this.reload();
      });
  }

  private reload(): void {
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
        this.labelsForDashboard = data;
        this.isLoading = false;
      });
  }

  public trackByFunc(index: number, label: ILabelForDashboard): string {
    return label.name;
  }
}
