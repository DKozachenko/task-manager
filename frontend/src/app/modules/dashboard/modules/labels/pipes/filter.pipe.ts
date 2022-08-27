import { ITaskForDashboard } from './../../tasks/models/interfaces';
import { Pipe, PipeTransform } from '@angular/core';
import { ILabelFilter, ILabelForDashboard } from '../models/interfaces';

@Pipe({ name: 'filter' })
export class Filter implements PipeTransform {
  transform(
    value: ILabelForDashboard[],
    filter: ILabelFilter
  ): ILabelForDashboard[] {
    if (!filter) return value;
    let filteredData: ILabelForDashboard[] = value;

    if (filter.name) {
      filteredData = value.filter(item => item.name.includes(filter.name));
    }

    return filteredData;
  }
}
