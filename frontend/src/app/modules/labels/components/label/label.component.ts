import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { ILabel, ILabelForDashboard, IResponse, ISendLabel } from '../../../shared/models/interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';
import { LabelService } from '../../store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'labels-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.sass'],
})
export class LabelComponent {
  @Input() public label: ILabelForDashboard = {
    name: '',
    colorHexCode: '',
  };

  constructor(
    private readonly modalService: NzModalService,
    private readonly notificationService: NzNotificationService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly labelService: LabelService
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
      .afterClose.subscribe((sendLabel: ISendLabel) => {
        this.labelService.updateById(sendLabel)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              this.notificationService.error('Ошибка', 'Ошибка при редактировании записи');
              return of({
                data: {
                  name: '',
                  colorId: '',
                  tasksIds: [],
                  userId: ''
                },
                error: true,
                message: ''
              });
            }),
            untilDestroyed(this)
          )
          .subscribe((response: IResponse<ILabel>) => {
            if (!response.error) {
              this.notificationService.success('Успешно', 'Запись была успешно обновлена');
            }
          });
      });
  }

  public delete(id: string): void {
    this.labelService.deleteById(id)
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
