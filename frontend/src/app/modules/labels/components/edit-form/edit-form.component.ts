import { Validators } from '@angular/forms';
import { LabelService } from './../../store/label.service';
import {  Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlsOf, FormArray } from '@ngneat/reactive-forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ILabel, IResponse, ITask } from '../../../shared/models/interfaces';
import { catchError, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.sass'],
})
export class EditFormComponent implements OnInit {
  @Input() public id: string = '';

  public label: ILabel = {
    name: '',
    colorId: '',
    tasksIds: [],
    userId: '',
  };

  public hexCode: string = '#ffffff';

  public allTasks: ITask[] = [{
    name: '',
    description: '',
    dateCreation: new Date(),
    labelsIds: [],
    userId: '',
  }];

  public form!: FormGroup<ControlsOf<ILabel>>;
  constructor(private readonly modalRef: NzModalRef,
    private readonly labelService: LabelService) {}

  ngOnInit(): void {
    console.log(this.id)
    this.labelService.getById(this.id)
      .pipe(
        catchError((err: HttpErrorResponse) => of({
          data: this.label,
          error: false,
          message: ''
        })),
        untilDestroyed(this)
      )
      .subscribe((response: IResponse<ILabel>) => {
        this.label = response.data;

        this.form = new FormGroup<ControlsOf<ILabel>>({
          name: new FormControl(this.label.name, [Validators.required]),
          tasksIds: new FormArray<string>(
            this.label?.tasksIds?.map((id: string) => new FormControl<string>(id)) ?? []
          ),
        });

      });




  }

  public close(): void {
    this.modalRef.close(null);
  }

  public save(): void {
    this.modalRef.close({
      ...this.form.value,
      color: {
        hexCode: this.hexCode
      }
    });
  }

  public trackByFunc(index: number, task: ITask) {
    return task.name;
  }
}
