import { TaskService } from './../../store/task.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ILabel, IResponse, ITask } from 'src/app/modules/shared/models/interfaces';
import { LabelService } from '../../../labels/store';

@UntilDestroy()
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
})
export class EditFormComponent implements OnInit {
  @Input() public id: string = '';

  public task: ITask = {
    name: '',
    description: '',
    dateCreation: new Date(),
    labelIds: [],
    userId: '',
  };

  public allLabels: Observable<IResponse<ILabel[]>> = this.labelService.getAll();

  public form!: FormGroup;

  constructor(
    private readonly taskService: TaskService,
    private readonly labelService: LabelService,
    private readonly modalRef: NzModalRef,
    private readonly notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.taskService
        .getById(this.id)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.notificationService.error(
              'Ошибка',
              'Ошибка при получении записи'
            );
            return of({
              data: this.task,
              error: true,
              message: '',
            });
          }),
          untilDestroyed(this)
        )
        .subscribe((response: IResponse<ITask>) => {
          if (!response.error) {
            this.task = response.data;
            this.fillForm();
          }
        });
    } else {
      this.fillForm();
    }
  }

  private fillForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.task.name, [Validators.required]),
      description: new FormControl(this.task.description, [Validators.required]),
      labelIds: new FormControl(this.task?.labelIds),
    });
  }

  public close(): void {
    this.modalRef.close(null);
  }

  public save(): void {
    this.modalRef.close({
      _id: this.id ?? undefined,
      ...this.form.value,
    });
  }

  public trackByFunc(index: number, label: ILabel) {
    return label.name;
  }
}
