import { ILabelForDashboard } from 'src/app/modules/dashboard/modules/labels/models/interfaces';

/**
 * Модель задачи для дашборда
 */
export interface ITaskForDashboard {
  _id?: string;
  name: string;
  description: string;
  labelsForTask?: ILabelForDashboard[];
}
