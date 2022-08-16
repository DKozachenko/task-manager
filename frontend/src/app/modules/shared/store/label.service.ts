import { LabelStore } from './label.store';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { RestService } from '../../shared/services';
import { IColor, ILabelForDashboard, IResponse } from '../../shared/models/interfaces';
import { ILabel } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private restService: RestService,
              private labelStore: LabelStore) {}

  public getAll(): Observable<IResponse<ILabel[]>> {
    return this.restService.getAll<ILabel[]>('labels')
      .pipe(
        map((response: IResponse<ILabel[]>) => {
          this.labelStore.set(response.data);
          return response;
        })
      );
  }


  public getById(id: string): Observable<IResponse<ILabel>> {
    return this.restService.getById<ILabel>('labels', id);
  }


  public add(newLabel: ILabel): Observable<IResponse<ILabel>> {
    return this.restService.add<ILabel>('labels', newLabel)
      .pipe(
        map((response: IResponse<ILabel>) => {
          this.labelStore.add(response.data);
          return response;
        })
      );
  }

  public updateById(updatedLabel: ILabel): Observable<IResponse<ILabel>> {
    return this.restService.updateById<ILabel>('labels', updatedLabel._id ?? '', updatedLabel)
      .pipe(
        map((response: IResponse<ILabel>) => {
          this.labelStore.update(response.data._id ?? '', response.data);
          return response;
        })
      );
  }

  public deleteById(id: string): Observable<IResponse> {
    return this.restService.deleteById('labels', id)
      .pipe(
        map((response: IResponse) => {
          this.labelStore.remove(({ _id }) => _id === id);
          return response;
        })
      );
  }

  public getAllForDashboard(): Observable<ILabelForDashboard[]> {
    return this.getAll()
      .pipe(
        switchMap((response: IResponse<ILabel[]>) => {
          return forkJoin([
            of(response),
            this.restService.getAll<IColor[]>('colors')
          ]);
        }),
        map(([
          labelResponse, colorResponse]: [IResponse<ILabel[]>, IResponse<IColor[]>
        ]) => {
          const allColors: IColor[] = colorResponse.data;

          return labelResponse.data.map((label: ILabel) => {
            return {
              _id: label._id,
              name: label.name,
              colorHexCode: allColors.find((color: IColor) => color._id === label.colorId)?.hexCode ?? 'Нет цвета'
            };
          });
        })
      );
  }

}
