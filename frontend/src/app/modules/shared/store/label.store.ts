import { LabelState } from '../models/states/label.state';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'labels', idKey: '_id' })
export class LabelStore extends EntityStore<LabelState> {
  constructor() {
    const tokenValue: string | null = localStorage.getItem('token-jwt');

    super({
      token: tokenValue ?? undefined
    });
  }
}
