import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IError } from '../../models/interfaces';

@Injectable()
export class RestService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(`/api/${route}`);
  }

  public getById<T>(route: string, id: string): Observable<T | IError> {
    return this.httpClient.get<T | IError>(`/api/${route}/${id}`);
  }

  public add<T, K = T>(route: string, newItem: T): Observable<K> {
    return this.httpClient.post<K>(`/api/${route}`, newItem);
  }

  public updateById<T>(route: string, id: string, updatedItem: T): Observable<T | IError> {
    return this.httpClient.put<T | IError>(`/api/${route}/${id}`, updatedItem);
  }

  public deleteById<T>(route: string, id: string): Observable<T | IError> {
    return this.httpClient.delete<T | IError>(`/api/${route}/${id}`);
  }
}
