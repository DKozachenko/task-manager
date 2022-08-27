import { ITaskFilter, ITaskForDashboard } from '../../dashboard/modules/tasks/models/interfaces';
import { Pipe, PipeTransform } from '@angular/core';
import { ILabelFilter, ILabelForDashboard } from '../../dashboard/modules/labels/models/interfaces';

@Pipe({ name: 'filter' })
export class Filter implements PipeTransform {
  transform(
    value: any,
    filter: ILabelFilter | ITaskFilter
  ): any[] {
    if (!filter) return value;
    let filteredData: any[] = value;

    if (filter.name) {
      filteredData = value.filter((item : ILabelForDashboard | ITaskForDashboard) => item.name.includes(filter.name));
    }

    return filteredData;
  }
}
