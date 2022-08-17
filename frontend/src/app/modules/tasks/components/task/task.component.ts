import { Component, Input, ViewContainerRef } from '@angular/core';
import { ITaskForDashboard } from '../../../shared/models/interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';

@Component({
  selector: 'tasks-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent {
  @Input() public task: ITaskForDashboard = {
    name: '',
    description: '',
    labelsForTask: []
  };

  constructor(
    private readonly modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  public edit(id: string): void {
    this.modalService
      .create({
        nzContent: EditFormComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzComponentParams: {
          id,
        },
      })
      .afterClose.subscribe((result) => console.log(result));
  }

  public delete(id: string): void {
    console.log(id);
  }

}
