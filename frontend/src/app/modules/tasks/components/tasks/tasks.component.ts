import { Component, OnInit } from '@angular/core';
import { ITaskForDashboard } from '../../../shared/models/interfaces';

@Component({
  selector: 'tasks-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit {
  public arr: ITaskForDashboard[] = [
    {
      name: 'name 1',
      description: 'desc 1',
      labelsForTask: [
        {
          name: 'good',
          colorHexCode: 'green',
        },
        {
          name: 'good 2',
          colorHexCode: 'red',
        },
      ],
    },
    {
      name: 'name 2',
      description: 'desc 2',
      labelsForTask: [
        {
          name: 'dsfdfdffsdf',
          colorHexCode: '#ccc',
        },
        {
          name: 'fgfgf 2',
          colorHexCode: 'blue',
        },
      ],
    },
    {
      name: 'name 3',
      description: 'desc 3',
      labelsForTask: [
        {
          name: 'nop',
          colorHexCode: '#fefe55',
        },
        {
          name: 'dsfdsfdfsd 22',
          colorHexCode: '#a4faaa',
        },
        {
          name: 'dsfdsfdfsd 223434',
          colorHexCode: '#a4fa23',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public trackByFunc(index: number, task: ITaskForDashboard): string {
    return task.name;
  }
}
