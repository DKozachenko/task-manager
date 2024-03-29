import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { IResponse, ITaskDto } from 'src/app/modules/shared/models/interfaces';
import { RestService } from 'src/app/modules/shared/services';
import { TaskStore } from '.';
import { ILabelForDashboard } from '../../labels/models/interfaces';
import { LabelService } from '../../labels/store';
import { ITaskForDashboard } from '../models/interfaces';

/**
 * Сервис для задач
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private restService: RestService,
    private labelService: LabelService,
    private taskStore: TaskStore
  ) {}

  /**
   * Получение всех задач из БД
   * @returns ответ с массивом задач
   */
  public getAll(): Observable<IResponse<ITaskDto[]>> {
    return this.restService.getAll<ITaskDto[]>('tasks').pipe(
      map((response: IResponse<ITaskDto[]>) => {
        this.taskStore.set(response.data);
        return response;
      })
    );
  }

  /**
   * Получение задачи по id
   * @param id - id записи
   * @returns задачу из БД
   */
  public getById(id: string): Observable<IResponse<ITaskDto>> {
    return this.restService.getById<ITaskDto>('tasks', id);
  }

  /**
   * Добавление задачи
   * @param newTask - новая задача
   * @returns созданную задачу из БД
   */
  public add(newTask: ITaskDto): Observable<IResponse<ITaskDto>> {
    return this.restService.add<ITaskDto>('tasks', newTask).pipe(
      map((response: IResponse<ITaskDto>) => {
        this.taskStore.add(response.data);
        return response;
      })
    );
  }

  /**
   * Обновление задачи по id
   * @param updatedTask - новая задача
   * @returns обновленную задачу из БД
   */
  public updateById(updatedTask: ITaskDto): Observable<IResponse<ITaskDto>> {
    return this.restService
      .updateById<ITaskDto>('tasks', updatedTask._id ?? '', updatedTask)
      .pipe(
        map((response: IResponse<ITaskDto>) => {
          this.taskStore.update(response.data._id ?? '', response.data);
          return response;
        })
      );
  }

  /**
   * Удаление задачи по id
   * @param id - id записи
   * @returns ответ без данных
   */
  public deleteById(id: string): Observable<IResponse> {
    return this.restService.deleteById('tasks', id).pipe(
      map((response: IResponse) => {
        this.taskStore.remove(({ _id }) => _id === id);
        return response;
      })
    );
  }

  /**
   * Получение задач для дашборда
   * @returns массив с задачами для дашборда
   */
  public getAllForDashboard(): Observable<ITaskForDashboard[]> {
    return this.getAll().pipe(
      switchMap((response: IResponse<ITaskDto[]>) => {
        return forkJoin([
          of(response),
          this.labelService.getAllForDashboard()
        ]);
      }),
      map(
        ([
          tasksResponse,
          labelsForDashboard
        ]: [
          IResponse<ITaskDto[]>,
          ILabelForDashboard[]
        ]) => {
          return tasksResponse.data.map((task: ITaskDto) => {
            return {
              _id: task._id,
              name: task.name,
              description: task.description,
              labelsForTask: labelsForDashboard.filter(
                (labelForDashboard: ILabelForDashboard) => {
                  return task.labelIds?.includes(labelForDashboard._id ?? '');
                }
              ),
            };
          });
        }
      )
    );
  }
}
