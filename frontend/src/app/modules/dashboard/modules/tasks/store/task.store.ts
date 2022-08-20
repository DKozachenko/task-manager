import { TaskState } from '../models/states';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'tasks', idKey: '_id' })
export class TaskStore extends EntityStore<TaskState> {
  constructor() {
    super();
  }
}
