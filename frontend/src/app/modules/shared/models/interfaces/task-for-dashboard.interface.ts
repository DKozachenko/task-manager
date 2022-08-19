import { ILabelForDashboard } from '.';

/**
 * Модель задачи для дашборда
 */
export interface ITaskForDashboard {
  _id?: string;
  name: string;
  description: string;
  labelsForTask?: ILabelForDashboard[];
}
