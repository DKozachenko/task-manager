import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EntityAction, EntityActions } from '@datorama/akita';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, of } from 'rxjs';
import { ITaskForDashboard } from '../../models/interfaces';
import { TaskQuery, TaskService } from '../../store';

@UntilDestroy()
@Component({
  selector: 'tasks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  public tasksForDashboard: ITaskForDashboard[] = [];

  public isLoading: boolean = false;

  constructor(
    private readonly taskService: TaskService,
    private readonly taskQuery: TaskQuery,
    private readonly notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.reload();

    this.taskQuery
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

    this.taskService
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
      .subscribe((data: ITaskForDashboard[]) => {
        this.tasksForDashboard = data;
        this.isLoading = false;
      });
  }

  public trackByFunc(index: number, task: ITaskForDashboard): string {
    return task.name;
  }
}
