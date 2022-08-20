import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LabelStore } from '.';
import { LabelState } from '../states';

@Injectable({
  providedIn: 'root',
})
export class LabelQuery extends QueryEntity<LabelState> {
  constructor(protected override store: LabelStore) {
    super(store);
  }
}
