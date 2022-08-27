import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService } from './../../store/label.service';
import {  Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IResponse, ITaskDto } from 'src/app/modules/shared/models/interfaces';
import { TaskService } from '../../../tasks/store';
import { ISendLabel } from '../../models/interfaces';
import { BaseEditFormComponent } from 'src/app/modules/shared/classes';

/** Компонент формы редактирования метки */
@UntilDestroy()
@Component({
  selector: 'labels-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
})
export class EditFormComponent
  extends BaseEditFormComponent<ISendLabel>
  implements OnInit
{
  /** Id записи */
  @Input() public id: string = '';

  /** Модель цвета для колорпикера */
  public hexCode: string = '#ffffff';

  /** Все задачи для селекта */
  public allTasks: Observable<IResponse<ITaskDto[]>> =
    this.taskService.getAll();

  constructor(
    public override readonly modalRef: NzModalRef,
    private readonly labelService: LabelService,
    private readonly taskService: TaskService,
    private readonly notificationService: NzNotificationService
  ) {
    super(modalRef);
  }

  public ngOnInit(): void {
    /** Заполнение модели дефолтными значениями */
    this.model = {
      name: '',
      color: {
        hexCode: this.hexCode,
      },
      taskIds: [],
      userId: '',
    };

    /** Если есть id, то получаем модель, если нет - просто заполняем форму */
    if (this.id) {
      this.labelService
        .getById(this.id)
        .pipe(
          catchError((response: HttpErrorResponse) => {
            this.notificationService.error(
              'Ошибка',
              `Ошибка при получении записи: ${response.error.message}`
            );
            return of(this.model);
          }),
          untilDestroyed(this)
        )
        .subscribe((label: ISendLabel) => {
          this.model = label;
          this.fillForm();
        });
    } else {
      this.fillForm();
    }
  }

  /** Заполнение формы */
  public fillForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.model.name, [Validators.required]),
      taskIds: new FormControl(this.model?.taskIds),
    });

    this.hexCode = this.model.color.hexCode;
  }

  /** Перезаписанный метод сохранения для метки */
  public override save(): void {
    this.modalRef.close({
      ...this.model,
      ...this.form.value,
      color: {
        hexCode: this.hexCode,
      },
    });
  }

  /** Функция trackBy для задач в селекте */
  public trackByFunc(index: number, task: ITaskDto) {
    return task.name;
  }
}
