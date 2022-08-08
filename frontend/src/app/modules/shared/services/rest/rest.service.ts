import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../../models/interfaces';

@Injectable()
export class RestService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Получение всех элементов
   * Т - тип получаемого значения
   * @param route - адрес запроса
   * @returns все элементы
   */
  public getAll<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(`/api/${route}`);
  }

  /**
   * Получение элемента по id
   * Т - тип получаемого значения
   * @param route - адрес запроса
   * @param id - id записи
   * @returns элемент или сообщение об ошибке
   */
  public getById<T>(route: string, id: string): Observable<T | IMessage> {
    return this.httpClient.get<T | IMessage>(`/api/${route}/${id}`);
  }

  /**
   * Добавление элемента
   * Т - тип отправляемого значения, по умолчанию К
   * К - тип получаемого значения
   * @param route - адрес запроса
   * @param newItem - добавляемый элемент
   * @returns добавленный в БД элемент
   */
  public add<T, K = T>(route: string, newItem: T): Observable<K> {
    return this.httpClient.post<K>(`/api/${route}`, newItem);
  }

  /**
   * Обновление элемента по id
   * Т - тип обновляемого значения
   * @param route - адрес запроса
   * @param id - id записи
   * @param updatedItem - обновленный элемент
   * @returns обновленный в БД элемент или сообщение об ошибке
   */
  public updateById<T>(
    route: string,
    id: string,
    updatedItem: T
  ): Observable<T | IMessage> {
    return this.httpClient.put<T | IMessage>(`/api/${route}/${id}`, updatedItem);
  }

  /**
   * Удаление по id
   * @param route - адрес запроса
   * @param id - id записи
   * @returns сообщение
   */
  public deleteById(route: string, id: string): Observable<IMessage> {
    return this.httpClient.delete<IMessage>(`/api/${route}/${id}`);
  }
}
