/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpErrorResponse } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntityAction, EntityActions, QueryEntity } from '@datorama/akita';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, debounceTime, Observable, of } from 'rxjs';

/**
 * Базовый класс дашборда
 * T - тип данных
 * ST - тип сервиса
 * QT - тип класса с запросами
 */
@UntilDestroy()
export abstract class BaseDashboardComponent<
  T extends { name: string },
  FT,
  ST extends { getAllForDashboard(): Observable<T[]> },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  QT extends QueryEntity<any>
> implements OnInit
{
  /** Данные для дашборда */
  public dataForDashboard: T[] = [];

  /** Показатель загрузки */
  public isLoading: boolean = false;

  public searchForm!: FormGroup;

  public filter!: FT;

  constructor(
    private readonly service: ST,
    private readonly query: QT,
    public readonly notificationService: NzNotificationService
  ) {}

  public ngOnInit(): void {
    this.reload();

    /** При изменении стора обновляем данные */
    this.query
      .selectEntityAction([
        EntityActions.Add,
        EntityActions.Update,
        EntityActions.Remove,
      ])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((action: EntityAction<any>) => {
        this.reload();
      });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        console.log(value);
        this.filter = value;
      });
  }

  /** Получение данных */
  public reload(): void {
    this.isLoading = true;

    this.service
      .getAllForDashboard()
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.notificationService.error(
            'Ошибка',
            `Ошибка при получении всех записей: ${response.error.message}`
          );
          return of([]);
        }),
        untilDestroyed(this)
      )
      .subscribe((data: T[]) => {
        this.dataForDashboard = data;
        this.isLoading = false;
      });
  }

  /** Функция trackBy */
  public trackByFunc(index: number, item: T): string {
    return item.name;
  }
}
