import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TaskStore } from '.';
import { TaskState } from '../states';

/**
 * Класс для получения данных из стора задач
 */
@Injectable({
  providedIn: 'root',
})
export class TaskQuery extends QueryEntity<TaskState> {
  constructor(protected override store: TaskStore) {
    super(store);
  }
}
