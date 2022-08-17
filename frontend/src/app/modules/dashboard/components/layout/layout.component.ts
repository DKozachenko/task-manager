import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditFormComponent } from 'src/app/modules/labels/components';
import { DashboardState } from '../../types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  public state: DashboardState = 'tasks';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
      this.state = <DashboardState>segments[0].path;
    });
  }

  public add(): void {
    if (this.state === 'labels') {
      // this.modalService
      //   .create({
      //     nzContent: EditFormComponent,
      //     nzViewContainerRef: this.viewContainerRef,
      //     nzComponentParams: {
      //       id: undefined,
      //     },
      //   })
      //   .afterClose.subscribe((result) => console.log(result));
    }
  }
}
