import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Получение всех элементов
   * Т - тип получаемого значения
   * @param route - адрес запроса
   * @returns все элементы
   */
  public getAll<T>(route: string): Observable<IResponse<T>> {
    return this.httpClient.get<IResponse<T>>(`/${environment.apiUrl}/${route}`);
  }

  /**
   * Получение элемента по id
   * Т - тип получаемого значения
   * @param route - адрес запроса
   * @param id - id записи
   * @returns элемент или сообщение об ошибке
   */
  public getById<T>(route: string, id: string): Observable<IResponse<T>> {
    return this.httpClient.get<IResponse<T>>(`/${environment.apiUrl}/${route}/${id}`);
  }

  /**
   * Добавление элемента
   * Т - тип отправляемого значения, по умолчанию К
   * К - тип получаемого значения
   * @param route - адрес запроса
   * @param newItem - добавляемый элемент
   * @returns добавленный в БД элемент
   */
  public add<T, K = T>(route: string, newItem: T): Observable<IResponse<K>> {
    return this.httpClient.post<IResponse<K>>(`/${environment.apiUrl}/${route}`, newItem);
  }

  /**
   * Обновление элемента по id
   * Т - тип обновляемого значения
   * @param route - адрес запроса
   * @param id - id записи
   * @param updatedItem - обновленный элемент
   * @returns обновленный в БД элемент или сообщение об ошибке
   */
  public updateById<T>(route: string, id: string, updatedItem: T): Observable<IResponse<T>> {
    return this.httpClient.put<IResponse<T>>(`/${environment.apiUrl}/${route}/${id}`, updatedItem);
  }

  /**
   * Удаление по id
   * @param route - адрес запроса
   * @param id - id записи
   * @returns сообщение
   */
  public deleteById(route: string, id: string): Observable<IResponse> {
    return this.httpClient.delete<IResponse>(`/${environment.apiUrl}/${route}/${id}`);
  }
}
