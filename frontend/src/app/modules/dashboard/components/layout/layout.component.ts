import { LabelService } from './../../../labels/store/label.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthorizationService } from 'src/app/modules/authorization/store';
import { EditFormComponent as EditLabelForm} from 'src/app/modules/labels/components';
import { EditFormComponent as EditTaskForm } from 'src/app/modules/tasks/components';
import { DashboardState } from '../../types';
import { ILabel, IResponse, ISendLabel } from 'src/app/modules/shared/models/interfaces';
import { catchError, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
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
    private readonly authorizationService: AuthorizationService,
    private readonly labelService: LabelService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
      this.state = <DashboardState>segments[0].path;
    });
  }

  public add(): void {
    if (this.state === 'labels') {
      this.modalService
        .create({
          nzContent: EditLabelForm,
          nzViewContainerRef: this.viewContainerRef,
          nzComponentParams: {
            id: undefined,
          },
        })
        .afterClose.subscribe((sendLabel: ISendLabel) => {
          console.log(sendLabel)
          this.labelService.add(sendLabel)
            .pipe(
              catchError((err: HttpErrorResponse) => of({
                data: {
                  name: '',
                  colorId: '',
                  tasksIds: [],
                  userId: ''
                },
                error: false,
                message: ''
              })),
              untilDestroyed(this)
            )
            .subscribe((response: IResponse<ILabel>) => {});
        });
    } else {
      this.modalService
        .create({
          nzContent: EditTaskForm,
          nzViewContainerRef: this.viewContainerRef,
          nzComponentParams: {
            id: undefined,
          },
        })
        .afterClose.subscribe((result) => console.log(result));
    }
  }

  public logout(): void {
    this.authorizationService.logout();
    this.router.navigate(['/']);
  }
}
