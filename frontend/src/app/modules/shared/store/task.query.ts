import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TaskStore } from '.';
import { TaskState } from '../models/states';

@Injectable({
  providedIn: 'root',
})
export class TaskQuery extends QueryEntity<TaskState> {
  constructor(protected override store: TaskStore) {
    super(store);
  }
}
