import { LabelQuery } from './../../store/label.query';
import { catchError, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../store';
import { ILabelForDashboard } from './../../../shared/models/interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityAction, EntityActions } from '@datorama/akita';

@UntilDestroy()
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass'],
})
export class LabelsComponent implements OnInit {
  public labelsForDashboard: ILabelForDashboard[] = [];

  constructor(private readonly labelService: LabelService,
              private readonly labelQuery: LabelQuery) {}

  public ngOnInit(): void {
    this.reload();

    this.labelQuery.selectEntityAction([
      EntityActions.Add,
      EntityActions.Update,
      EntityActions.Remove
    ]).subscribe((action: EntityAction<string>) => {
      this.reload();
    });
  }

  private reload(): void {
    this.labelService.getAllForDashboard()
      .pipe(
        catchError((err: HttpErrorResponse) => of([])),
        untilDestroyed(this)
      )
      .subscribe((data: ILabelForDashboard[]) => {
        console.log(data);
        this.labelsForDashboard = data;
      });
  }


  public trackByFunc(index: number, label: ILabelForDashboard): string {
    return label.name;
  }
}
