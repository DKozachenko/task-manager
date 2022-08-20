import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ILabelForDashboard, IResponse, ITask, ITaskForDashboard } from 'src/app/modules/shared/models/interfaces';
import { RestService } from 'src/app/modules/shared/services';
import { TaskStore } from '.';
import { LabelService } from '../../labels/store';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private restService: RestService,
    private labelService: LabelService,
    private taskStore: TaskStore
  ) {}

  public getAll(): Observable<IResponse<ITask[]>> {
    return this.restService.getAll<ITask[]>('tasks').pipe(
      map((response: IResponse<ITask[]>) => {
        this.taskStore.set(response.data);
        return response;
      })
    );
  }

  public getById(id: string): Observable<IResponse<ITask>> {
    return this.restService.getById<ITask>('tasks', id);
  }

  public add(newTask: ITask): Observable<IResponse<ITask>> {
    return this.restService.add<ITask>('tasks', newTask).pipe(
      map((response: IResponse<ITask>) => {
        this.taskStore.add(response.data);
        return response;
      })
    );
  }

  public updateById(updatedTask: ITask): Observable<IResponse<ITask>> {
    return this.restService
      .updateById<ITask>('tasks', updatedTask._id ?? '', updatedTask)
      .pipe(
        map((response: IResponse<ITask>) => {
          this.taskStore.update(response.data._id ?? '', response.data);
          return response;
        })
      );
  }

  public deleteById(id: string): Observable<IResponse> {
    return this.restService.deleteById('tasks', id).pipe(
      map((response: IResponse) => {
        this.taskStore.remove(({ _id }) => _id === id);
        return response;
      })
    );
  }

  public getAllForDashboard(): Observable<ITaskForDashboard[]> {
    return this.getAll()
      .pipe(
        switchMap((response: IResponse<ITask[]>) => {
          return forkJoin([
            of(response),
            this.labelService.getAllForDashboard(),
          ]);
        }),
        map(
          ([
            tasksResponse,
            labelsForDashboard
          ]: [
            IResponse<ITask[]>,
            ILabelForDashboard[],
          ]) => {
            return tasksResponse.data.map((task: ITask) => {
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
