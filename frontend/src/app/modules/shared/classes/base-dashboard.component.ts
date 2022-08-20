/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnInit } from '@angular/core';
import { EntityAction, EntityActions, QueryEntity } from '@datorama/akita';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@UntilDestroy()
export abstract class BaseDashboardComponent<
  T extends { name: string },
  QT extends QueryEntity<any>
> implements OnInit
{
  /** Данные для дашборда */
  public dataForDashboard: T[] = [];

  /** Показатель загрузки */
  public isLoading: boolean = false;

  constructor(private readonly query: QT) {}

  public ngOnInit(): void {
    this.reload();

    /** При изменении стора обновляем данные */
    this.query
      .selectEntityAction([
        EntityActions.Add,
        EntityActions.Update,
        EntityActions.Remove,
      ])
      .subscribe((action: EntityAction<any>) => {
        this.reload();
      });
  }

  /** Абстрактное получение данных */
  public abstract reload(): void;

  /** Функция trackBy */
  public trackByFunc(index: number, item: T): string {
    return item.name;
  }
}
