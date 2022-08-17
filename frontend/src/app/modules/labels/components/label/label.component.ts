import { Component, Input, ViewContainerRef } from '@angular/core';
import { ILabelForDashboard } from '../../../shared/models/interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from '..';

@Component({
  selector: 'labels-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.sass'],
})
export class LabelComponent {
  @Input() public label: ILabelForDashboard = {
    name: '',
    colorHexCode: '',
  };

  constructor(
    // private readonly modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  public edit(id: string): void {
    // this.modalService
    //   .create({
    //     nzContent: EditFormComponent,
    //     nzViewContainerRef: this.viewContainerRef,
    //     nzComponentParams: {
    //       id,
    //     },
    //   })
    //   .afterClose.subscribe((result) => console.log(result));
  }

  public delete(id: string): void {
    console.log(id);
  }

}
