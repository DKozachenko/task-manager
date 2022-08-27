import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LabelState } from '../states';

/**
 * Стор меток
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'labels', idKey: '_id' })
export class LabelStore extends EntityStore<LabelState> {
  constructor() {
    super();
  }
}
