import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthorizationService } from 'src/app/modules/authorization/store';
import { DashboardState } from '../../types';
import { ILabel, IResponse, ISendLabel, ITask } from 'src/app/modules/shared/models/interfaces';
import { catchError, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LabelService } from '../../modules/labels/store';
import { TaskService } from '../../modules/tasks/store';
import { EditFormComponent as EditLabelForm} from 'src/app/modules/dashboard/modules/labels/components';
import { EditFormComponent as EditTaskForm } from 'src/app/modules/dashboard/modules/tasks/components';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  public state: DashboardState = 'tasks';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly notificationService: NzNotificationService,
    private readonly authorizationService: AuthorizationService,
    private readonly labelService: LabelService,
    private readonly taskService: TaskService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
      this.state = <DashboardState>segments[0].path;
    });
  }

  public add(): void {
    if (this.state === 'labels') {
      this.modalService
        .create({
          nzContent: EditLabelForm,
          nzViewContainerRef: this.viewContainerRef,
        })
        .afterClose.subscribe((sendLabel: ISendLabel) => {
          if (sendLabel) {
            console.log(sendLabel);
            this.labelService
              .add(sendLabel)
              .pipe(
                catchError((err: HttpErrorResponse) => {
                  this.notificationService.error(
                    'Ошибка',
                    'Ошибка при добавлении записи'
                  );
                  return of({
                    data: {
                      name: '',
                      colorId: '',
                      taskIds: [],
                      userId: '',
                    },
                    error: true,
                    message: '',
                  });
                }),
                untilDestroyed(this)
              )
              .subscribe((response: IResponse<ILabel>) => {
                if (!response.error) {
                  this.notificationService.success(
                    'Успешно',
                    'Запись была успешно добавлена'
                  );
                }
              });
          }
        });
    } else {
      this.modalService
        .create({
          nzContent: EditTaskForm,
          nzViewContainerRef: this.viewContainerRef,
        })
        .afterClose.subscribe((task: ITask) => {
          if (task) {
            this.taskService
              .add(task)
              .pipe(
                catchError((err: HttpErrorResponse) => {
                  this.notificationService.error(
                    'Ошибка',
                    'Ошибка при добавлении записи'
                  );
                  return of({
                    data: {
                      name: '',
                      colorId: '',
                      description: '',
                      labelsIds: [],
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
                    'Запись была успешно добавлена'
                  );
                }
              });
          }
        });

    }
  }

  public logout(): void {
    this.authorizationService.logout();
    this.router.navigate(['/']);
  }
}
