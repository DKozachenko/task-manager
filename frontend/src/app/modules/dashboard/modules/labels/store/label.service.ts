import { LabelStore } from './label.store';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { RestService } from 'src/app/modules/shared/services';
import { IColorDto, ILabelDto, IResponse }
  from 'src/app/modules/shared/models/interfaces';
import { ILabelForDashboard, ISendLabel } from '../models/interfaces';

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

  public getAll(): Observable<IResponse<ILabelDto[]>> {
    return this.restService.getAll<ILabelDto[]>('labels').pipe(
      map((response: IResponse<ILabelDto[]>) => {
        this.labelStore.set(response.data);
        return response;
      })
    );
  }

  public getById(id: string): Observable<ISendLabel> {
    return this.restService.getById<ILabelDto>('labels', id)
      .pipe(
        switchMap((response: IResponse<ILabelDto>) => {
          return forkJoin([
            of(response),
            this.restService.getById<IColorDto>('colors', response.data.colorId ?? ''),
          ]);
        }),
        map(
          ([
            labelResponse, colorResponse]: [
            IResponse<ILabelDto>,
            IResponse<IColorDto>
          ]) => {
            const color: IColorDto = colorResponse.data;

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

  public add(newLabel: ISendLabel): Observable<IResponse<ILabelDto>> {
    return this.restService.add<ISendLabel, ILabelDto>('labels', newLabel).pipe(
      map((response: IResponse<ILabelDto>) => {
        this.labelStore.add(response.data);
        return response;
      })
    );
  }

  public updateById(updatedLabel: ISendLabel): Observable<IResponse<ILabelDto>> {
    return this.restService
      .updateById<ISendLabel, ILabelDto>('labels', updatedLabel._id ?? '', updatedLabel)
      .pipe(
        map((response: IResponse<ILabelDto>) => {
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
        switchMap((response: IResponse<ILabelDto[]>) => {
          return forkJoin([
            of(response),
            this.restService.getAll<IColorDto[]>('colors'),
          ]);
        }),
        map(
          ([
            labelResponse, colorResponse]: [
            IResponse<ILabelDto[]>,
            IResponse<IColorDto[]>
          ]) => {
            const allColors: IColorDto[] = colorResponse.data;

            return labelResponse.data.map((label: ILabelDto) => {
              return {
                _id: label._id,
                name: label.name,
                colorHexCode:
                  allColors.find((color: IColorDto) => color._id === label.colorId)
                    ?.hexCode ?? 'Нет цвета',
              };
            });
          }
        )
      );
  }
}
