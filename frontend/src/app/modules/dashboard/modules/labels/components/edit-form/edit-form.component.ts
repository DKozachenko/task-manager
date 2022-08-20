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
import { ILabelForDashboard, ISendLabel } from '../../models/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
})
export class EditFormComponent implements OnInit {
  @Input() public id: string = '';

  public hexCode: string = '#ffffff';

  public label: ISendLabel = {
    name: '',
    color: {
      hexCode: this.hexCode,
    },
    taskIds: [],
    userId: '',
  };

  public allTasks: Observable<IResponse<ITaskDto[]>> = this.taskService.getAll();

  public form!: FormGroup;

  constructor(
    private readonly modalRef: NzModalRef,
    private readonly labelService: LabelService,
    private readonly taskService: TaskService,
    private readonly notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.labelService
        .getById(this.id)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.notificationService.error(
              'Ошибка',
              'Ошибка при получении записи'
            );
            return of(this.label);
          }),
          untilDestroyed(this)
        )
        .subscribe((label: ISendLabel) => {
          this.label = label;
          this.fillForm();
        });
    } else {
      this.fillForm();
    }
  }

  private fillForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.label.name, [Validators.required]),
      taskIds: new FormControl(this.label?.taskIds)
    });

    this.hexCode = this.label.color.hexCode;
  }

  public close(): void {
    this.modalRef.close(null);
  }

  public save(): void {
    this.modalRef.close({
      _id: this.id ?? undefined,
      ...this.form.value,
      color: {
        hexCode: this.hexCode,
      },
    });
  }

  public trackByFunc(index: number, label: ILabelForDashboard) {
    return label.name;
  }
}
