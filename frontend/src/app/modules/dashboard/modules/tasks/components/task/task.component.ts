import { Component, Input, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TaskService } from '../../store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IResponse, ITaskDto } from 'src/app/modules/shared/models/interfaces';
import { ITaskForDashboard } from '../../models/interfaces';
import { BaseElementComponent } from 'src/app/modules/shared/classes';

@UntilDestroy()
@Component({
  selector: 'tasks-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent extends BaseElementComponent<TaskService> {
  /** Передаваемая задача */
  @Input() public task: ITaskForDashboard = {
    name: '',
    description: '',
    labelsForTask: [],
  };

  constructor(
    public readonly modalService: NzModalService,
    public readonly taskService: TaskService,
    public override readonly notificationService: NzNotificationService,
    public viewContainerRef: ViewContainerRef
  ) {
    super(taskService, notificationService);
  }

  /** Редактирование */
  public edit(id: string): void {
    this.modalService
      .create({
        nzContent: EditFormComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          id,
        },
      })
      .afterClose.subscribe((updateTask: ITaskDto) => {
        if (updateTask) {
          this.taskService
            .updateById(updateTask)
            .pipe(
              catchError((err: HttpErrorResponse) => of({
                data: {
                  name: '',
                  description: '',
                  labelIds: [],
                  userId: '',
                },
                error: true,
                message: '',
              })),
              untilDestroyed(this)
            )
            .subscribe((response: IResponse<ITaskDto>) => {
              if (response.error) {
                this.notificationService.error(
                  'Ошибка',
                  'Ошибка при редактировании записи'
                );
              } else {
                this.notificationService.success(
                  'Успешно',
                  'Запись была успешно обновлена'
                );
              }
            });
        }
      });
  }
}
