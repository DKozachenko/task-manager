import { TaskService } from './../../store/task.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ILabelDto, IResponse, ITaskDto } from 'src/app/modules/shared/models/interfaces';
import { LabelService } from '../../../labels/store';
import { BaseEditFormComponent } from 'src/app/modules/shared/classes';

@UntilDestroy()
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
})
export class EditFormComponent
  extends BaseEditFormComponent<ITaskDto>
  implements OnInit
{
  /** Id записи */
  @Input() public id: string = '';

  /** Все метки для селекта */
  public allLabels: Observable<IResponse<ILabelDto[]>> = this.labelService.getAll();

  constructor(
    private readonly taskService: TaskService,
    private readonly labelService: LabelService,
    public override readonly modalRef: NzModalRef,
    private readonly notificationService: NzNotificationService
  ) {
    super(modalRef);
  }

  public ngOnInit(): void {
    /** Заполнение модели дефолтными значениями */
    this.model = {
      name: '',
      description: '',
      dateCreation: new Date(),
      labelIds: [],
      userId: '',
    };

    /** Если есть id, то получаем модель, если нет - просто заполняем форму */
    if (this.id) {
      this.taskService
        .getById(this.id)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            return of({
              data: this.model,
              error: true,
              message: '',
            });
          }),
          untilDestroyed(this)
        )
        .subscribe((response: IResponse<ITaskDto>) => {
          if (response.error) {
            this.notificationService.error(
              'Ошибка',
              'Ошибка при получении записи'
            );
          } else {
            this.model = response.data;
            this.fillForm();
          }
        });
    } else {
      this.fillForm();
    }
  }

  /** Заполнение формы */
  public fillForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.model.name, [Validators.required]),
      description: new FormControl(this.model.description, [Validators.required]),
      labelIds: new FormControl(this.model?.labelIds),
    });
  }

  /** Функция trackBy для меток в селекте */
  public trackByFunc(index: number, label: ILabelDto): string {
    return label.name;
  }
}
