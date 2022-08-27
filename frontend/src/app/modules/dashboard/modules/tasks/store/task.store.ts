import { TaskState } from '../states';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Стор задач
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'tasks', idKey: '_id' })
export class TaskStore extends EntityStore<TaskState> {
  constructor() {
    super();
  }
}
