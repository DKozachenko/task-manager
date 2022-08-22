import { NzModalRef } from 'ng-zorro-antd/modal';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';

/**
 * Базовый класс формы редактирования
 * T - тип редактируемой модели
 */
@UntilDestroy()
export abstract class BaseEditFormComponent<T extends { _id?: string }> {
  /** Модель */
  public model!: T;

  /** Форма */
  public form!: FormGroup;

  constructor(
    public readonly modalRef: NzModalRef
  ) {}

  /** Абстрактный метод заполнения формы */
  public abstract fillForm(): void;

  /** Закрытие формы */
  public close(): void {
    this.modalRef.close(null);
  }

  /** Сохранение модели */
  public save(): void {
    this.modalRef.close({
      ...this.model,
      ...this.form.value,
    });
  }
}
