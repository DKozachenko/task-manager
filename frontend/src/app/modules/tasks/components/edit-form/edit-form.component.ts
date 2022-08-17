import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlsOf, FormArray } from '@ngneat/reactive-forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ILabel, ISendColor, ITask } from '../../../shared/models/interfaces';

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
    labelsIds: [],
    userId: '',
  };

  public color: ISendColor = {
    hexCode: '',
  };

  public allLabels: ILabel[] = [{
    name: '',
    colorId: '',
    tasksIds: [],
    userId: '',
  }];

  public form!: FormGroup<ControlsOf<ITask>>;
  constructor(private readonly modalRef: NzModalRef) {}

  ngOnInit(): void {
    this.form = new FormGroup<ControlsOf<ITask>>({
      name: new FormControl(this.task.name),
      description: new FormControl(this.task.description),
      labelsIds: new FormArray<string>(
        this.task.labelsIds?.map((id: string) => new FormControl<string>(id)) ??
          []
      ),
    });
  }

  public handleCancel(): void {
    this.modalRef.close(null);
  }

  public handleOk(): void {
    this.modalRef.close(this.form.value);
  }

  public trackByFunc(index: number, label: ILabel) {
    return label.name;
  }
}
