import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LabelStore } from '.';
import { LabelState } from '../states';

/**
 * Класс получения данных из стора меток
 */
@Injectable({
  providedIn: 'root',
})
export class LabelQuery extends QueryEntity<LabelState> {
  constructor(protected override store: LabelStore) {
    super(store);
  }
}
