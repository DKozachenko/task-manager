import { ISendLabel } from './../../../shared/models/interfaces/send-label.interface';
import { Validators } from '@angular/forms';
import { LabelService } from './../../store/label.service';
import {  Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlsOf, FormArray } from '@ngneat/reactive-forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ILabel, IResponse, ITask } from '../../../shared/models/interfaces';
import { catchError, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/modules/tasks/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    tasksIds: [],
    userId: '',
  };

  public allTasks: Observable<IResponse<ITask[]>> = this.taskService.getAll();

  public form!: FormGroup<ControlsOf<ILabel>>;

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
    this.form = new FormGroup<ControlsOf<ILabel>>({
      name: new FormControl(this.label.name, [Validators.required]),
      tasksIds: new FormArray<string>(
        this.label?.tasksIds?.map(
          (id: string) => new FormControl<string>(id)
        ) ?? []
      ),
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

  public trackByFunc(index: number, task: ITask) {
    return task.name;
  }
}
