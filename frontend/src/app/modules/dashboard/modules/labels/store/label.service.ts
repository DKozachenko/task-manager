import { LabelStore } from './label.store';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { RestService } from 'src/app/modules/shared/services';
import { IColor, ILabel, ILabelForDashboard, IResponse, ISendLabel } from 'src/app/modules/shared/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(
    private restService: RestService,
    private labelStore: LabelStore
  ) {}

  public setLoadingState(state: boolean): void {
    this.labelStore.setLoading(state);
  }

  public getAll(): Observable<IResponse<ILabel[]>> {
    return this.restService.getAll<ILabel[]>('labels').pipe(
      map((response: IResponse<ILabel[]>) => {
        this.labelStore.set(response.data);
        return response;
      })
    );
  }

  public getById(id: string): Observable<ISendLabel> {
    return this.restService.getById<ILabel>('labels', id)
      .pipe(
        switchMap((response: IResponse<ILabel>) => {
          return forkJoin([
            of(response),
            this.restService.getById<IColor>('colors', response.data.colorId ?? ''),
          ]);
        }),
        map(
          ([
            labelResponse, colorResponse]: [
            IResponse<ILabel>,
            IResponse<IColor>
          ]) => {
            const color: IColor = colorResponse.data;

            return {
              ...labelResponse.data,
              color: {
                hexCode: color.hexCode
              }
            };
          }
        )
      );
  }

  public add(newLabel: ISendLabel): Observable<IResponse<ILabel>> {
    return this.restService.add<ISendLabel, ILabel>('labels', newLabel).pipe(
      map((response: IResponse<ILabel>) => {
        this.labelStore.add(response.data);
        return response;
      })
    );
  }

  public updateById(updatedLabel: ISendLabel): Observable<IResponse<ILabel>> {
    return this.restService
      .updateById<ISendLabel, ILabel>('labels', updatedLabel._id ?? '', updatedLabel)
      .pipe(
        map((response: IResponse<ILabel>) => {
          this.labelStore.update(response.data._id ?? '', response.data);
          return response;
        })
      );
  }

  public deleteById(id: string): Observable<IResponse> {
    return this.restService.deleteById('labels', id).pipe(
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
            this.restService.getAll<IColor[]>('colors'),
          ]);
        }),
        map(
          ([
            labelResponse, colorResponse]: [
            IResponse<ILabel[]>,
            IResponse<IColor[]>
          ]) => {
            const allColors: IColor[] = colorResponse.data;

            return labelResponse.data.map((label: ILabel) => {
              return {
                _id: label._id,
                name: label.name,
                colorHexCode:
                  allColors.find((color: IColor) => color._id === label.colorId)
                    ?.hexCode ?? 'Нет цвета',
              };
            });
          }
        )
      );
  }
}
