import { ITask } from './../../../shared/models/interfaces/task.interface';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { IResponse, ITaskForDashboard } from '../../../shared/models/interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TaskService } from '../../store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'tasks-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent {
  @Input() public task: ITaskForDashboard = {
    name: '',
    description: '',
    labelsForTask: [],
  };

  constructor(
    private readonly modalService: NzModalService,
    private readonly taskService: TaskService,
    private readonly notificationService: NzNotificationService,
    private viewContainerRef: ViewContainerRef
  ) {}

  public edit(id: string): void {
    this.modalService
      .create({
        nzContent: EditFormComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          id,
        },
      })
      .afterClose.subscribe((updateTask: ITask) => {
        if (updateTask) {
          this.taskService
            .updateById(updateTask)
            .pipe(
              catchError((err: HttpErrorResponse) => {
                this.notificationService.error(
                  'Ошибка',
                  'Ошибка при редактировании записи'
                );
                return of({
                  data: {
                    name: '',
                    description: '',
                    labelIds: [],
                    userId: '',
                  },
                  error: true,
                  message: '',
                });
              }),
              untilDestroyed(this)
            )
            .subscribe((response: IResponse<ITask>) => {
              if (!response.error) {
                this.notificationService.success(
                  'Успешно',
                  'Запись была успешно обновлена'
                );
              }
            });
        }

      });
  }

  public delete(id: string): void {
    this.taskService.deleteById(id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.notificationService.error('Ошибка', 'Ошибка при удалении записи');
          return of({
            data: undefined,
            error: true,
            message: ''
          });
        }),
        untilDestroyed(this)
      )
      .subscribe((response: IResponse) => {
        if (!response.error) {
          this.notificationService.success('Успешно', 'Запись была успешно удалена');
        }
      });
  }
}
