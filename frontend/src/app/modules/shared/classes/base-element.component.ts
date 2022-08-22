import { HttpErrorResponse } from '@angular/common/http';
import { ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, Observable, of } from 'rxjs';
import { IResponse } from '../models/interfaces';

@UntilDestroy()
export abstract class BaseElementComponent
  <ST extends { deleteById(id: string): Observable<IResponse> }>
{
  constructor(
    public readonly service: ST,
    public readonly notificationService: NzNotificationService
  ) {}

  /** Асбтракный метод редактирования */
  public abstract edit(id: string): void;

  /** Удаление */
  public delete(id: string): void {
    this.service
      .deleteById(id)
      .pipe(
        catchError((err: HttpErrorResponse) => of({
          data: undefined,
          error: true,
          message: '',
        })),
        untilDestroyed(this)
      )
      .subscribe((response: IResponse) => {
        if (response.error) {
          this.notificationService.error(
            'Ошибка',
            'Ошибка при удалении записи'
          );
        } else {
          this.notificationService.success('Успешно', 'Запись была успешно удалена');
        }
      });
  }
}
