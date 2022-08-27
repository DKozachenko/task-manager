import { ITaskForDashboard } from '../../dashboard/modules/tasks/models/interfaces';
import { Pipe, PipeTransform } from '@angular/core';
import { ILabelForDashboard } from '../../dashboard/modules/labels/models/interfaces';

@Pipe({ name: 'filter' })
export class Filter implements PipeTransform {
  transform(value: any[], filter: any): any[] {
    if (!filter) return value;
    let filteredData: any[] = value;

    if (filter?.name) {
      filteredData = value.filter((item : ILabelForDashboard | ITaskForDashboard) => item.name.includes(filter.name));
    }

    if (filter?.labelIds) {
      filteredData = filteredData.filter((item: ITaskForDashboard) => {
        const taskLabelIds = item?.labelsForTask?.map((item: ILabelForDashboard) => item?._id);

        for (let i = 0; i < filter?.labelIds?.length; ++i) {
          if (!taskLabelIds?.includes(filter?.labelIds[i])) return false;
        }

        return true;
      });
    }

    return filteredData;
  }
}
