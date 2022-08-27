import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';
import { LabelService } from '../../store';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ILabelDto, IResponse } from 'src/app/modules/shared/models/interfaces';
import { ILabelForDashboard, ISendLabel } from '../../models/interfaces';
import { BaseElementComponent } from 'src/app/modules/shared/classes';

/**
 * Компонент метки
 */
@UntilDestroy()
@Component({
  selector: 'labels-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.sass'],
})
export class LabelComponent extends BaseElementComponent<LabelService> {
  /** Передаваемая метка */
  @Input() public label: ILabelForDashboard = {
    name: '',
    colorHexCode: '',
  };

  constructor(
    public readonly modalService: NzModalService,
    public override readonly notificationService: NzNotificationService,
    public viewContainerRef: ViewContainerRef,
    public readonly labelService: LabelService
  ) {
    super(labelService, notificationService);
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
      .afterClose.subscribe((sendLabel: ISendLabel) => {
        if (sendLabel) {
          this.labelService
            .updateById(sendLabel)
            .pipe(
              catchError((response: HttpErrorResponse) =>
                of({
                  data: {
                    name: '',
                    colorId: '',
                    tasksIds: [],
                    userId: '',
                  },
                  error: true,
                  message: response.error.message,
                })
              ),
              untilDestroyed(this)
            )
            .subscribe((response: IResponse<ILabelDto>) => {
              if (response.error) {
                this.notificationService.error(
                  'Ошибка',
                  `Ошибка при редактировании записи: ${response.message}`
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
